import _ from 'lodash';

export default class User {
  constructor (skeleton = {}) {
    const skeletonClone = _.cloneDeep(skeleton);

    const { email, photoURL } = skeletonClone;
    this.email = email;
    this.photoURL = photoURL;
  }
};
