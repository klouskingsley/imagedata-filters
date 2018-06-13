var ghpages = require('gh-pages');

ghpages.publish('dist', function(err) {
    if (err) {
        console.log('deploy err', err)
    } else {
        console.log('deploy success')
    }
});