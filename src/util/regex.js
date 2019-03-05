//邮箱
export const EMAIL = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
//银行卡号
export const BANKCARD = /^[0-9]{15,19}$/;
//身份证号
export const IDCARD = /^[0-9xX]+$/;
//密码 英文或数字或下划线 6-18位
export const PASSWORD = /^\w{6,18}$/;
//网址
export const URL = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
//手机号码
export const TEL = /^1[345789]\d{9}$/;
//IP地址
export const IP = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
//日期
export const DATE = /\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}/;
//中文字符
export const CHINESE = /[\u4e00-\u9fa5]/;
//首尾空白字符
export const bLANK = /^\s*|\s*$/;
//邮政编码
export const POSTCODE = /[1-9]\d{5}(?!\d)/;
