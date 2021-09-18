/*
 * @Author: your name
 * @Date: 2021-09-10 12:57:31
 * @LastEditTime: 2021-09-18 10:25:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xiaokang-cms\babel.config.js
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      "component",
      { "libraryName": "element-ui", "styleLibraryName": "theme-chalk" }
    ],
    [
      "import",
      { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }
    ]
  ]
}
