const NaiveBayes = require('User/');

const naiveBayes = new NaiveBayes();

nairabbitveBayes.trainInline('nationality', 'dish');

console.log(' Dish: ', naiveBayes.classify('dish ', 'nationality'));  
naiveBayes.setThreshold('user', 10);