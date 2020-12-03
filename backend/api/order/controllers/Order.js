"use strict";
const fs = require("fs");
const path = require("path");
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

const helpers = {
  sendEmail: async (to, order, address, prices, html, status) => {
    try {
      await strapi.plugins["email"].services.email.send({
        to,
        subject: "Slash Care - Order Confirmation",
        html: helpers.generateEmailBody(order, address, prices, html, status),
      });
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  },
  baseCreate: async (ctx) => {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.order.create(data, { files }, 5);
    } else {
      entity = await strapi.services.order.create(ctx.request.body, 5);
    }

    entity = sanitizeEntity(entity, { model: strapi.models.order });

    return entity;
  },

  baseUpdate: async (ctx) => {
    const { id } = ctx.params;

    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.order.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.order.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.order });
  },
  loadHtml: (fileName) => {
    const myPath = `../../../static/email-templates/${fileName}.html`;
    const html = fs.readFileSync(path.resolve(__dirname, myPath), "utf8");
    return html;
  },
  generateEmailBody: (order, address, prices, html, status) => {
    const costPrice = prices.reduce((a, b) => +a + +b.costPrice, 0);
    const salePrice = prices.reduce((a, b) => +a + +b.salePrice, 0);
    const found = html.match(/<tr data-duplicate="true">.*?<\/tr>/gms);
    const foundImgs = html.match(/<tr data-duplicateimgs="true">.*?<\/tr>/gms);
    let list = "";
    let imagesList = "";

    prices.forEach(
      (x) =>
        (list += found[0]
          .replace(/{{itemName}}/g, x.name)
          .replace(/{{costItemPrice}}/g, x.costPrice)
          .replace(/{{saleItemPrice}}/g, x.salePrice))
    );

    if (foundImgs) {
      order.OrderSupplier.forEach((x) =>
        x.OrderServiceOption.forEach(
          (y) =>
            (imagesList += foundImgs[0]
              .replace(/{{imageUrl}}/g, y.UserImage && y.UserImage.url)
              .replace(/{{imageServiceName}}/g, y.service.name)
              .replace(/{{imageNote}}/g, y.Note))
        )
      );
    }

    html = html
      .replace(/{{orderReference}}/g, order.Reference)
      .replace(/{{orderId}}/g, order.id)
      .replace(/{{orderStatus}}/g, (status || "").replace(/_/g, " "))
      .replace(/{{costPrice}}/g, `${costPrice} kr`)
      .replace(/{{salePrice}}/g, `${salePrice} kr`)
      .replace(/{{userName}}/g, `${address.FirstName} ${address.LastName}`)
      .replace(/{{address}}/g, address.Address1)
      .replace(/{{city}}/g, address.City)
      .replace(/{{zip}}/g, address.City)
      .replace(/<tr data-duplicate="true">.*?<\/tr>/gms, list)
      .replace(/<tr data-duplicateimgs="true">.*?<\/tr>/gms, imagesList);

    return html;
  },
  getAddress: async (entity) => {
    const addresses = await strapi
      .query("address")
      .find({ user: entity.user.id });

    return addresses[0];
  },
  getServicesAndSupplierPrices: (entity) => {
    const prices = entity.OrderSupplier.map((x) =>
      x.OrderServiceOption.map((y) => {
        return {
          name: y.service.name,
          costPrice: y.ServiceOption[0].CostPrice,
          salePrice: y.ServiceOption[0].SalePrice,
          supplierId: x.supplier.id,
        };
      })
    ).flat();

    return prices;
  },
  filterPrices(prices, supplierId) {
    return prices.filter((x) => x.supplierId === supplierId);
  },
  hasUpdatedStatus: (oldOrder, newOrder) => {
    if (oldOrder.OrderSupplier.length) {
      for (let i = 0; i < newOrder.OrderSupplier.length; i++) {
        const oldSupp = oldOrder.OrderSupplier[i];
        if (oldSupp && oldSupp.Status !== newOrder.OrderSupplier[i].Status)
          return newOrder.OrderSupplier[i].Status;
      }
    }
    return false;
  },
};

module.exports = {
  async create(ctx) {
    const entity = await helpers.baseCreate(ctx);

    // const address = await helpers.getAddress(entity);
    // const suppliers = entity.OrderSupplier.map((x) => x.supplier);
    // const prices = helpers.getServicesAndSupplierPrices(entity);
    // const html = helpers.loadHtml("receipt");
    // const supplierHtml = helpers.loadHtml("receipt_supplier");

    // helpers.sendEmail(entity.user.email, entity, address, prices, html);
    // suppliers.forEach((x) =>
    //   helpers.sendEmail(
    //     x.Email,
    //     entity,
    //     address,
    //     helpers.filterPrices(prices, x.id),
    //     supplierHtml
    //   )
    // );

    return entity;
  },
  async update(ctx) {
    const { id } = ctx.params;
    const oldOrder = await strapi.services.order.findOne({ id });
    const newOrder = await helpers.baseUpdate(ctx);

    const address = await helpers.getAddress(newOrder);
    const html = helpers.loadHtml("order_status_updated");

    const status = helpers.hasUpdatedStatus(oldOrder, newOrder);
    if (status)
      helpers.sendEmail(
        newOrder.user.email,
        newOrder,
        address,
        [],
        html,
        status
      );

    return newOrder;
  },
};
