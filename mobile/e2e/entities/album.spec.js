const jestExpect = require('expect');
const {
  reloadApp,
  loginAsUser,
  logout,
  goBack,
  tapFirstElementByLabel,
  openAndTapDrawerMenuItemByLabel,
  waitThenTapButton,
  waitForElementToBeVisibleById,
  setDateTimePickerValue,
  scrollTo,
} = require('../utils');

describe('Album Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToAlbumScreen();
  });

  const navigateToAlbumScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('albumEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('albumEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('albumScreen');
  };

  it('should allow you to create, update, and delete the Album entity', async () => {
    await expect(element(by.id('albumScreen'))).toBeVisible();

    /*
     * Create Album
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('albumEditScrollView');
    // title
    await scrollTo('titleInput', 'albumEditScrollView');
    await element(by.id('titleInput')).replaceText('Granite');
    await element(by.id('titleInput')).tapReturnKey();
    // description
    await scrollTo('descriptionInput', 'albumEditScrollView');
    await element(by.id('descriptionInput')).replaceText('long-text-blob-content');
    await element(by.id('descriptionInput')).tapReturnKey();
    // created
    await scrollTo('createdInput', 'albumEditScrollView');
    await setDateTimePickerValue('createdInput', '2022-09-01T11:10:00-06:00', 'ISO8601');
    // save
    await scrollTo('submitButton', 'albumEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Album - validate the creation
     */
    await waitForElementToBeVisibleById('albumDetailScrollView');
    // title
    await scrollTo('title', 'albumDetailScrollView');
    await expect(element(by.id('title'))).toHaveLabel('Granite');
    // description
    await scrollTo('description', 'albumDetailScrollView');
    await expect(element(by.id('description'))).toHaveLabel('long-text-blob-content');
    // created
    await scrollTo('created', 'albumDetailScrollView');
    const createdCreateAttributes = await element(by.id('created')).getAttributes();
    jestExpect(Date.parse(createdCreateAttributes.label)).toEqual(Date.parse('2022-09-01T11:10:00-06:00'));

    /*
     * Update Album
     */
    await scrollTo('albumEditButton', 'albumDetailScrollView');
    await tapFirstElementByLabel('Album Edit Button');
    await waitForElementToBeVisibleById('albumEditScrollView');
    // title
    await scrollTo('titleInput', 'albumEditScrollView');
    await element(by.id('titleInput')).replaceText('Granite');
    await element(by.id('titleInput')).tapReturnKey();
    // description
    await scrollTo('descriptionInput', 'albumEditScrollView');
    await element(by.id('descriptionInput')).replaceText('long-text-blob-content-2');
    await element(by.id('descriptionInput')).tapReturnKey();
    // created
    await scrollTo('createdInput', 'albumEditScrollView');
    await setDateTimePickerValue('createdInput', '2022-09-01T11:05:00-06:00', 'ISO8601');
    // save
    await scrollTo('submitButton', 'albumEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Album - validate the update
     */
    await waitForElementToBeVisibleById('albumDetailScrollView');
    // title
    await scrollTo('title', 'albumDetailScrollView');
    await expect(element(by.id('title'))).toHaveLabel('Granite');
    // description
    await scrollTo('description', 'albumDetailScrollView');
    await expect(element(by.id('description'))).toHaveLabel('long-text-blob-content-2');
    // created
    await scrollTo('created', 'albumDetailScrollView');
    const createdUpdateAttributes = await element(by.id('created')).getAttributes();
    jestExpect(Date.parse(createdUpdateAttributes.label)).toEqual(Date.parse('2022-09-01T11:05:00-06:00'));

    /*
     * Delete
     */
    await scrollTo('albumDeleteButton', 'albumDetailScrollView');
    await waitThenTapButton('albumDeleteButton');
    await waitForElementToBeVisibleById('albumDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('albumScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
