/**
 * 留言处理方法
 */

/**
 * 本地存储的消息前缀
 *
 * @type {string}
 */
export const prefix = 'message_';

/**
 * 获取本地存储中所有消息，顺序：由最到旧
 *
 * @function
 * @return {Array}
 */
export const getAll = () => Object.keys(localStorage)
  .filter(key => key.indexOf(prefix) === 0)
  .map((key) => {
    try {
      return JSON.parse(localStorage[key]);
    } catch (err) {
      console.error('JSON.parse error', err);
    }
    return null;
  })
  .filter(key => key !== null)
  .sort((a, b) => b.id - a.id); // 做个排序

/**
 * 删除消息
 *
 * @param {Object} params 参数
 * @param {number} params.id 消息ID
 */
export const del = ({ id } = {}) => localStorage.removeItem(`${prefix}${id}`);

/**
 * 新增消息
 *
 * @param {Object} params 参数
 * @param {number} params.id 消息ID
 * @param {string} params.message 消息内容
 */
export const add = ({ id, message } = {}) => {
  localStorage.setItem(prefix + id, JSON.stringify({ id, message }));
};
