import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';


var storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: 600*1000,
    enableCache: true,
});

let appStorage = {};


appStorage._save = (key,data,expires) => {
    storage.save({
        key,data,expires
    })
};

appStorage._load = (key,cb) => {
    storage.load({
        key: key,

        // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
        autoSync: true,

        // syncInBackground(默认为true)意味着如果数据过期，
        // 在调用sync方法的同时先返回已经过期的数据。
        // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
        syncInBackground: false,

        // 你还可以给sync方法传递额外的参数
        syncParams: {
            extraFetchOptions: {
                // 各种参数
            },
            someFlag: true,
        },
    }).then(ret => {
        cb(ret);
    }).catch(err => {
        //如果没有找到数据且没有sync方法，
        //或者有其他异常，则在catch中返回
        console.log(err.message);
        switch (err.name) {
            case 'NotFoundError':
                console.log('未找到该数据');
                // TODO;
                break;
            case 'ExpiredError':
                console.log('数据已过期');
                // TODO
                break;
        }
    })
};

appStorage._remove = function() {
    console.log(arguments,arguments.length);
    for(let i=0;i<arguments.length;i++){
        storage.remove({key:arguments[i]})
    }
};

storage.sync = {
    //token登录流程
    //先检测access_token是否存在并未过期，如果正常，进入app界面
    //否则检测refresh_token是否存在并未过期，如果正常，则获取去access_token,并执行下一步操作
    //否则返回null 进入登录页
    async accessToken() {
        try{
            const refreshToken = await storage.load({key:'refreshToken'});
            const newAccessToken = {
                key:'accessToken',
                data:'new token',
                // expires:6*1000
            };
            const newRefreshToken = {
                key:'refreshToken',
                data:'new refresh token',
                // expires:20*1000
            };
            storage.save(newAccessToken);
            storage.save(newRefreshToken);
            return newAccessToken;
        }catch(err){
            return null;
        }

        // const {
        //     id,
        //     syncParams: { extraFetchOptions, someFlag }
        // } = params;
        // const response = await fetch('user/?id=' + id, {
        //     ...extraFetchOptions
        // });
        // const responseText = await response.text();
        // console.log(`user${id} sync resp: `, responseText);
        // const json = JSON.parse(responseText);
        // if (json && json.token) {
        //     storage.save({
        //         key: 'token',
        //         id,
        //         data: json.token
        //     });
        //     if (someFlag) {
        //         // 根据一些自定义标志变量操作
        //     }
        //     // 返回所需数据
        //     return json.token;
        // } else {
        //     // 出错时抛出异常
        //     throw new Error(`error syncing user${id}`);
        // }
    }
};

module.exports = appStorage;

