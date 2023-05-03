
class ElvLive {
  /**
   * Instantiate the EluvioLive SDK
   *
   * @namedParams
   * @param {EluvioConfiguration} config - Eluvio Live Configuration
   * @return {EluvioLive} - New EluvioLive object connected to the specified content fabric and blockchain
   */
  constructor({ config }) {
    this.mainObjId = config.mainObjId;
    this.debug = false;
  }

}

export default ElvLive;
