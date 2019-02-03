import localforage from 'localforage';

const nmstore = localforage.createInstance({
  name: 'nexus-mods-merchandise'
});

export default nmstore;
