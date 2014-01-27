/**
 * ImagingRequest
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {},
  
  afterUpdate: function (values, next) {
    console.log(values);
    if (values.requestor) {
      var modality = values.modality || '';
      EmailService.sendNotificationEmail({email: values.requestor, specimenID: values.specimenID, modality: modality});
    };
    next();
  }

};
