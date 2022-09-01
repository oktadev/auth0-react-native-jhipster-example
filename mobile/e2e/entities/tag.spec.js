const {
  reloadApp,
  loginAsUser,
  logout,
  goBack,
  tapFirstElementByLabel,
  openAndTapDrawerMenuItemByLabel,
  waitThenTapButton,
  waitForElementToBeVisibleById,
  scrollTo,
} = require('../utils');

describe('Tag Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToTagScreen();
  });

  const navigateToTagScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('tagEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('tagEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('tagScreen');
  };

  it('should allow you to create, update, and delete the Tag entity', async () => {
    await expect(element(by.id('tagScreen'))).toBeVisible();

    /*
     * Create Tag
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('tagEditScrollView');
    // name
    await scrollTo('nameInput', 'tagEditScrollView');
    await element(by.id('nameInput')).replaceText('revolutionize Alabama');
    await element(by.id('nameInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'tagEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Tag - validate the creation
     */
    await waitForElementToBeVisibleById('tagDetailScrollView');
    // name
    await scrollTo('name', 'tagDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('revolutionize Alabama');

    /*
     * Update Tag
     */
    await scrollTo('tagEditButton', 'tagDetailScrollView');
    await tapFirstElementByLabel('Tag Edit Button');
    await waitForElementToBeVisibleById('tagEditScrollView');
    // name
    await scrollTo('nameInput', 'tagEditScrollView');
    await element(by.id('nameInput')).replaceText('revolutionize Alabama');
    await element(by.id('nameInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'tagEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Tag - validate the update
     */
    await waitForElementToBeVisibleById('tagDetailScrollView');
    // name
    await scrollTo('name', 'tagDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('revolutionize Alabama');

    /*
     * Delete
     */
    await scrollTo('tagDeleteButton', 'tagDetailScrollView');
    await waitThenTapButton('tagDeleteButton');
    await waitForElementToBeVisibleById('tagDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('tagScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
