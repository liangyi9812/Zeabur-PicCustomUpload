require('dotenv').config();
const express = require('express');
const cloudinaryProcess = require('./api/cloudinary-process'); // 您的函数文件路径

const app = express();
const port = process.env.PORT || 443; // 可以根据需要更改端口号

const routeToStrategyMap = {
      '/upload/cloudinary': cloudinaryProcess
};

app.post('/upload/:api', (req, res) => {
    const api = req.params.api;
    const strategyClass = routeToStrategyMap[`/upload/${api}`];

    if (!strategyClass) {
        // 处理未知路由
        res.status(404).json({error: 'Unknown API route'});
        return;
    }
    new strategyClass().process(req, res);
});

app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
});
