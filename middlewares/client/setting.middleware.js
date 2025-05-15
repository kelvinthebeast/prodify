const SettingGeneral = require("../../models/settings-general.model");


exports.settingGeneral = async (req, res, next) => {
  const settingGeneral = await SettingGeneral.findOne({});
  res.locals.settingGeneral = settingGeneral;

  next();
}