/**
 * 转换语言中的地区为大写
 *
 * @param {string} lang 需要转换的语言
 * @return {string}
 *
 * @description
 *  语言是由 语言-地区 组成
 *      - 语言标识参考：https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
 *      - 地区标识参考：https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
 *
 * @example
 * transformLang('zh-cn') => 'zh-CN'
 * transformLang('en-us') => 'en-US'
 * transformLang('en') => 'en
 */
export const transformLang = (lang) => {
  const arr = lang.split('-');

  // 如果没有 - 则认为没有地区
  if (arr.length === 1) {
    return lang;
  }

  // 把最后一个 - 分隔的字母转大写
  arr.splice(arr.length - 1, 1, arr.slice(-1)[0].toUpperCase());

  return arr.join('-');
};

export const temp = true;
