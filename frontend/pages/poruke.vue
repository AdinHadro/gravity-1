<template>
  <div>
    <div class="container main-section">
      <div class="body-section" v-if="messages.size > 0">
        <div class="left-section col-md-4" v-bind:class="{'active':!showMessage}">
          <ul>
            <li
              v-for="chat in chats"
              v-bind:key="chat.user.id"
              v-bind:class="{ active: (activeUser == chat.user.id) }"
              v-on:click="showChat(chat)"
            >
              <div class="chatList">
                <avatar :user="chat.user" />
                <div class="desc">
                  <small class="time">
                    <timeago :datetime="chat.lastMessage.created_at"></timeago>
                  </small>
                  <h5>{{chat.user.username}}</h5>
                  <small class="description">{{chat.lastMessage.text}}</small>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="right-section col-md-8" v-bind:class="{'active':showMessage}">
          <v-btn text outlined color="grey" class="buttonstyle" v-on:click="back">
            <i class="fa fa-arrow-left" aria-hidden="true"></i> &nbsp; Nazad
          </v-btn>

          <div class="message">
            <ul id="messages-list">
              <li
                v-for="message in messages.get(activeUser)"
                v-bind:key="message.id"
                v-bind:class="{ 'msg-left': !message.isMine, 'msg-right': message.isMine }"
              >
                <div class="msg-left-sub">
                  <img :src="users.get(message.fromUser.id.toString()).imageUrl" />
                  <div class="msg-desc">{{message.text}}</div>
                  <small>
                    <timeago :datetime="message.created_at"></timeago>
                  </small>
                </div>
              </li>
              <!-- <li class="msg-day">
                <small>Wednesday</small>
              </li>-->
            </ul>
          </div>
          <div class="right-section-bottom">
            <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
              <v-text-field
                v-model="messageText"
                placeholder="Poruka"
                v-on:keyup.enter="sendMessage"
                :rules="[rules.max]"
              ></v-text-field>
              <v-btn color="success" class="mr-4" fab small @click="sendMessage">
                <v-icon>mdi-send</v-icon>
              </v-btn>
            </v-form>
          </div>
        </div>
      </div>
      <div class="no-results" v-if="!loading && messages.size == 0">
        <h2>Nemate poruka. Kliknite na artikal i pošaljite poruku prodavaču direktno. Sve vaše poruke će biti vidljive ovde.</h2>
      </div>
    </div>
  </div>
</template>
<script>
import messagesQuery from "~/apollo/queries/message/messages";
import usersQuery from "~/apollo/queries/user/usersfull";
import Avatar from "~/components/Avatar.vue";
import strapi from "~/utils/Strapi";

export default {
  components: {
    Avatar
  },
  data() {
    return {
      showMessage: false,
      loading: true,
      activeUser: 0,
      messages: new Map(),
      chats: [],
      users: new Map(),
      messageText: "",
      valid: true,
      scrollToBottom: 0,
      rules: {
        max: v => !v || v.length <= 1000 || "Maksimalno 1000 karaktera"
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    }
  },
  watch: {
    scrollToBottom: function() {
      this.$nextTick(function() {
        var container = document.getElementById("messages-list");
        container.scrollTop = container.scrollHeight;
      });
    },
    user(newUser, oldUser) {
      this.redirectIfNotLoggedIn();
    }
  },
  async created() {
    if (this.redirectIfNotLoggedIn()) this.loadMessages();
  },
  methods: {
    redirectIfNotLoggedIn() {
      if (!this.user.id) {
        this.$router.replace({
          path: "/"
        });
      }
      return !!this.user.id;
    },
    async loadMessages() {
      const req = {
        query: messagesQuery,
        variables: {
          where: {}
        }
      };

      req.variables.where.fromUser = this.user.id;
      let sent = (await this.$apollo.query(req)).data.messages;

      delete req.variables.where.fromUser;
      req.variables.where.toUser = this.user.id;
      let recieved = (await this.$apollo.query(req)).data.messages;

      sent.forEach(x => {
        x.isMine = true;
        x.otherUserId = x.toUser.id;
      });

      recieved.forEach(x => {
        x.isMine = false;
        x.otherUserId = x.fromUser.id;
      });

      const sorted = sent
        .concat(recieved)
        .sort((a, b) => (a.created_at < b.created_at ? 1 : -1));

      let map = new Map();

      sorted.forEach(message => {
        const collection = map.get(message.otherUserId);
        if (!collection) {
          map.set(message.otherUserId, [message]);
        } else {
          collection.unshift(message);
        }
      });

      await this.loadUsers(map);
      this.messages = map;
      this.activeUser = map.keys().next().value;
      this.loading = false;
      if (map.size > 0) this.scrollToBottom++;
    },
    async loadUsers(map) {
      const req = {
        query: usersQuery,
        variables: {
          where: { id_in: map.keys() }
        }
      };

      const res = (await this.$apollo.query(req)).data.users;

      res.forEach(x => (x.imageUrl = x.image ? (process.env.CMS_URL + x.image.url) : ''));
      this.users = new Map(res.map(i => [i.id, i]));

      map.forEach(x => {
        this.chats.push({
          user: this.users.get(x[0].otherUserId),
          lastMessage: x.slice(-1)[0]
        });
      });
    },
    async sendMessage() {
      if (
        this.$refs.form.validate() &&
        this.messageText &&
        this.messageText.length
      ) {
        let res = await strapi.createEntry("messages", {
          fromUser: this.user.id,
          toUser: this.activeUser,
          text: this.messageText
        });

        res.isMine = true;
        res.otherUserId = this.activeUser;
        this.messageText = "";
        this.messages.get(this.activeUser).push(res);
        this.messages = this.messages;
        this.scrollToBottom++;
      }
    },
    showChat(chat) {
      this.activeUser = chat.user.id;
      this.scrollToBottom++;
      this.showMessage = true;
    },
    back() {
      this.showMessage = false;
    }
  }
};
</script>
<style scoped>
.back {
  display: none;
}

.buttonstyle {
  color: grey !important;
}

@media (max-width: 768px) {
  .back {
    display: block;
  }
  .left-section,
  .right-section {
    width: 100%;
    display: none;
  }

  .right-section.active,
  .left-section.active {
    display: block;
  }
}
.main-section small {
  font-size: 14px;
}
.main-section h3,
.main-section h5 {
  margin: 0px;
}
.body-section {
  clear: both;
  overflow: hidden;
  width: 100%;
  display: flex;
  margin: 20px 0;
}
.left-section {
  height: 500px;
  border-right: 1px solid #e6e6e6;
  background-color: #fff;
  z-index: 1;
  position: relative;
  overflow: scroll;
}
.left-section ul {
  padding: 0px;
  margin: 0px;
  list-style: none;
}
.left-section ul li {
  padding: 15px 0px;
  cursor: pointer;
}
.left-section ul li.active {
  background: #009ef7;
  color: #fff;
  position: relative;
}
.left-section ul li.active .desc time {
  color: #fff;
}
.left-section ul li.active:before {
  position: absolute;
  content: "";
  right: -10px;
  border: 5px solid #009ef7;
  top: 0px;
  bottom: 0px;
  border-radius: 0px 3px 3px 0px;
}
.left-section ul li.active:after {
  position: absolute;
  content: "";
  bottom: 0px;
  right: 0px;
  left: auto;
  width: 100%;
  top: 0px;
  -webkit-box-shadow: -8px 4px 10px #a1a1a1;
  -moz-box-shadow: -8px 4px 10px #a1a1a1;
  box-shadow: -8px 4px 10px #a1a1a1;
}
.left-section .chatList {
  overflow: hidden;
  display: flex;
}
.left-section .chatList .desc .description {
  width: 231px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  margin-top: 10px;
}
.left-section .chatList .desc h5 {
  margin-top: 6px;
  line-height: 5px;
  font-weight: bold;
}
.left-section .chatList .desc .time {
  position: absolute;
  right: 15px;
  color: #c1c1c1;
}
.right-section {
  height: 500px;
  background-color: #f6f6f6;
  position: relative;
}
.message {
  height: calc(100% - 96px);
  font-family: sans-serif;
}
.message ul {
  list-style: none;
  margin: 0px auto;
  padding: 25px;
  overflow: scroll;
  height: 100%;
}
.message ul li {
  position: relative;
  width: 80%;
  padding: 15px 0px;
  clear: both;
}
.message ul li.msg-left {
  float: left;
}
.message ul li.msg-left img {
  position: absolute;
  width: 40px;
  bottom: 30px;
}
.message ul li.msg-left .msg-desc {
  margin-left: 70px;
  font-size: 14px;
  background: #e8e8e8;
  padding: 5px 10px;
  border-radius: 5px 5px 5px 0px;
  position: relative;
}
.message ul li.msg-left .msg-desc:before {
  position: absolute;
  content: "";
  border: 10px solid transparent;
  border-bottom-color: #e8e8e8;
  bottom: 0px;
  left: -10px;
}
.message ul li.msg-left small {
  float: right;
  color: #c1c1c1;
}

.message ul li.msg-right {
  float: right;
}
.message ul li.msg-right img {
  position: absolute;
  width: 40px;
  right: 0px;
  bottom: 30px;
}
.message ul li.msg-right .msg-desc {
  word-wrap: break-word;
  margin-right: 46px;
  font-size: 14px;
  background: #cce5ff;
  color: #004085;
  padding: 5px 10px;
  border-radius: 5px 5px 5px 0px;
  position: relative;
}
.message ul li.msg-right .msg-desc:before {
  position: absolute;
  content: "";
  border: 10px solid transparent;
  border-bottom-color: #cce5ff;
  bottom: 0px;
  right: -10px;
}
.message ul li.msg-right small {
  float: right;
  color: #c1c1c1;
  margin-right: 70px;
}
.message ul li.msg-day {
  border-top: 1px solid #ebebeb;
  width: 100%;
  padding: 0px;
  margin: 15px 0px;
}
.message ul li.msg-day small {
  position: absolute;
  top: -10px;
  background: #f6f6f6;
  color: #c1c1c1;
  padding: 3px 10px;
  left: 50%;
  transform: translateX(-50%);
}
.right-section-bottom {
  background: #fff;
  width: 100%;
  padding: 15px;
  position: absolute;
  bottom: 0px;
  border-top: 1px solid #e6e6e6;
  text-align: center;
}
form {
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-application.trampa-app .right-section-bottom .v-input {
  margin: 0 20px;
}
.no-results {
  margin: 100px;
}
.avatar {
  margin: 0 20px;
}
</style>