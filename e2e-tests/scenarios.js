'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /engView when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/engView");
  });


  describe('engView', function() {

    beforeEach(function() {
      browser.get('index.html#/engView');
    });


    it('should render engView when user navigates to /engView', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for engView/);
    });

  });


  describe('ruView', function() {

    beforeEach(function() {
      browser.get('index.html#/ruView');
    });


    it('should render ruView when user navigates to /ruView', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for ruView/);
    });

  });
});
