module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"], // Ensures proper Expo & React Native support
    };
};
