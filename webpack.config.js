const path = require("path");

module.exports = {
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    entry: {
        index: path.join(__dirname, "src", "pages", "index", "Main.js")
    },
    output: {
        path: path.join(__dirname, "AIRPlayer", "build_target")
    }
};