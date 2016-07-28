exports.config = {
  specs: ['../test/e2e/**/*.js'],
  onPrepare: function() {
    browser.driver.get('http://localhost:3000/#/auth');
    browser.driver.findElement(by.id('entrar')).click();
    browser.driver.findElement(by.id('login_field'))
    	.sendKeys('p10open');
    browser.driver.findElement(by.id('password'))
    	.sendKeys('paulo123');
    browser.driver.findElement(by.name('commit')).click();  
  }
};