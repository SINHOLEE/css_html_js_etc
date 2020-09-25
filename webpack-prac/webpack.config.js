const path = require("path")

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  module: {
    rules: [{
      test: /\.js$/, // .js 확장자로 끝나는 모든 파일
      use: [path.resolve('./myloader.js')] // 방금 만든 로더를 적용한다
    }, 
    {
      test: /\.css$/, // .css 확장자로 끝나는 모든 파일
      use: ["style-loader", "css-loader"], // css-loader를 적용한다, style-loader를 앞에 적용한다.왜? 리스트에서 뒤부터 읽기 때문에.
    },
    {
      test: /\.png$/, // .png 확장자로 마치는 모든 파일
      loader: "file-loader", // 파일 로더를 적용한다
      options: {
        publicPath: "./dist/", // prefix를 아웃풋 경로로 지정
        name: "[name].[ext]?[hash]", // 파일명 형식
      },
    },
  ],
  }
}