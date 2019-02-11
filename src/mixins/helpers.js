const helpers = {
  methods: {
    outOfScope() {
      console.log('This action is out of the scope of this demo');
    },

    appTitle(title) {
      document.title = `${title} - Nexus Mods Merchandise`;
    }
  }
};

export default helpers;
