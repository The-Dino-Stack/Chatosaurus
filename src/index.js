const path = require('path');

module.exports = function docusaurusOpenAIAssistantPlugin(context, options) {
    const { baseUrl } = context;

    return {
        name: 'chatosaurus',

        async contentLoaded({ content, actions }) {
            const { addRoute, setGlobalData } = actions;

            console.log('Content loaded:', content);

            // Set global data with the apiKey from options
            setGlobalData({
                apiKey: options.apiKey,
            });

            addRoute({
                path: baseUrl + 'assistant',
                component: path.resolve(__dirname, './AssistantPage.jsx'),
                exact: true,
            });
        },
    };
};
