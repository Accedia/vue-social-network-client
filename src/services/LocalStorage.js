const PREFIX = 'VueSocialNetwork';

class LocalStorage {

  get(key, def = null) {
    const val = localStorage.getItem(`${PREFIX}_${key}`);
    return (val) || def;
  }

  set(key, val) {
    localStorage.setItem(`${PREFIX}_${key}`, val);
  }

  remove(key) {
    localStorage.removeItem(`${PREFIX}_${key}`);
  }

}

export default new LocalStorage();
