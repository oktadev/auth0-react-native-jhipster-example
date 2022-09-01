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

describe('Photo Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToPhotoScreen();
  });

  const navigateToPhotoScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('photoEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('photoEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('photoScreen');
  };

  it('should allow you to create, update, and delete the Photo entity', async () => {
    await expect(element(by.id('photoScreen'))).toBeVisible();

    /*
     * Create Photo
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('photoEditScrollView');
    // title
    await scrollTo('titleInput', 'photoEditScrollView');
    await element(by.id('titleInput')).replaceText('Direct');
    await element(by.id('titleInput')).tapReturnKey();
    // description
    await scrollTo('descriptionInput', 'photoEditScrollView');
    await element(by.id('descriptionInput')).replaceText('long-text-blob-content');
    await element(by.id('descriptionInput')).tapReturnKey();
    // image
    await scrollTo('imageInput', 'photoEditScrollView');
    await element(by.id('imageInput')).replaceText('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
    await element(by.id('imageInput')).tapReturnKey();
    await element(by.id('imageContentTypeInput')).replaceText('image/gif');
    await element(by.id('imageContentTypeInput')).tapReturnKey();
    // height
    await scrollTo('heightInput', 'photoEditScrollView');
    await element(by.id('heightInput')).replaceText('11353');
    await element(by.id('heightInput')).tapReturnKey();
    // width
    await scrollTo('widthInput', 'photoEditScrollView');
    await element(by.id('widthInput')).replaceText('46119');
    await element(by.id('widthInput')).tapReturnKey();
    // taken
    await scrollTo('takenInput', 'photoEditScrollView');
    await setDateTimePickerValue('takenInput', '2022-08-31T09:05:00-06:00', 'ISO8601');
    // uploaded
    await scrollTo('uploadedInput', 'photoEditScrollView');
    await setDateTimePickerValue('uploadedInput', '2022-08-31T14:53:00-06:00', 'ISO8601');
    // save
    await scrollTo('submitButton', 'photoEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Photo - validate the creation
     */
    await waitForElementToBeVisibleById('photoDetailScrollView');
    // title
    await scrollTo('title', 'photoDetailScrollView');
    await expect(element(by.id('title'))).toHaveLabel('Direct');
    // description
    await scrollTo('description', 'photoDetailScrollView');
    await expect(element(by.id('description'))).toHaveLabel('long-text-blob-content');
    // image
    await scrollTo('image', 'photoDetailScrollView');
    await expect(element(by.id('image'))).toBeVisible();
    // height
    await scrollTo('height', 'photoDetailScrollView');
    await expect(element(by.id('height'))).toHaveLabel('11353');
    // width
    await scrollTo('width', 'photoDetailScrollView');
    await expect(element(by.id('width'))).toHaveLabel('46119');
    // taken
    await scrollTo('taken', 'photoDetailScrollView');
    const takenCreateAttributes = await element(by.id('taken')).getAttributes();
    jestExpect(Date.parse(takenCreateAttributes.label)).toEqual(Date.parse('2022-08-31T09:05:00-06:00'));
    // uploaded
    await scrollTo('uploaded', 'photoDetailScrollView');
    const uploadedCreateAttributes = await element(by.id('uploaded')).getAttributes();
    jestExpect(Date.parse(uploadedCreateAttributes.label)).toEqual(Date.parse('2022-08-31T14:53:00-06:00'));

    /*
     * Update Photo
     */
    await scrollTo('photoEditButton', 'photoDetailScrollView');
    await tapFirstElementByLabel('Photo Edit Button');
    await waitForElementToBeVisibleById('photoEditScrollView');
    // title
    await scrollTo('titleInput', 'photoEditScrollView');
    await element(by.id('titleInput')).replaceText('Direct');
    await element(by.id('titleInput')).tapReturnKey();
    // description
    await scrollTo('descriptionInput', 'photoEditScrollView');
    await element(by.id('descriptionInput')).replaceText('long-text-blob-content-2');
    await element(by.id('descriptionInput')).tapReturnKey();
    // image
    await scrollTo('imageInput', 'photoEditScrollView');
    await element(by.id('imageInput')).replaceText('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
    await element(by.id('imageInput')).tapReturnKey();
    await element(by.id('imageContentTypeInput')).replaceText('image/gif');
    await element(by.id('imageContentTypeInput')).tapReturnKey();
    // height
    await scrollTo('heightInput', 'photoEditScrollView');
    await element(by.id('heightInput')).replaceText('97818');
    await element(by.id('heightInput')).tapReturnKey();
    // width
    await scrollTo('widthInput', 'photoEditScrollView');
    await element(by.id('widthInput')).replaceText('14452');
    await element(by.id('widthInput')).tapReturnKey();
    // taken
    await scrollTo('takenInput', 'photoEditScrollView');
    await setDateTimePickerValue('takenInput', '2022-08-31T17:32:00-06:00', 'ISO8601');
    // uploaded
    await scrollTo('uploadedInput', 'photoEditScrollView');
    await setDateTimePickerValue('uploadedInput', '2022-08-31T09:36:00-06:00', 'ISO8601');
    // save
    await scrollTo('submitButton', 'photoEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Photo - validate the update
     */
    await waitForElementToBeVisibleById('photoDetailScrollView');
    // title
    await scrollTo('title', 'photoDetailScrollView');
    await expect(element(by.id('title'))).toHaveLabel('Direct');
    // description
    await scrollTo('description', 'photoDetailScrollView');
    await expect(element(by.id('description'))).toHaveLabel('long-text-blob-content-2');
    // image
    await scrollTo('image', 'photoDetailScrollView');
    await expect(element(by.id('image'))).toBeVisible();
    // height
    await scrollTo('height', 'photoDetailScrollView');
    await expect(element(by.id('height'))).toHaveLabel('97818');
    // width
    await scrollTo('width', 'photoDetailScrollView');
    await expect(element(by.id('width'))).toHaveLabel('14452');
    // taken
    await scrollTo('taken', 'photoDetailScrollView');
    const takenUpdateAttributes = await element(by.id('taken')).getAttributes();
    jestExpect(Date.parse(takenUpdateAttributes.label)).toEqual(Date.parse('2022-08-31T17:32:00-06:00'));
    // uploaded
    await scrollTo('uploaded', 'photoDetailScrollView');
    const uploadedUpdateAttributes = await element(by.id('uploaded')).getAttributes();
    jestExpect(Date.parse(uploadedUpdateAttributes.label)).toEqual(Date.parse('2022-08-31T09:36:00-06:00'));

    /*
     * Delete
     */
    await scrollTo('photoDeleteButton', 'photoDetailScrollView');
    await waitThenTapButton('photoDeleteButton');
    await waitForElementToBeVisibleById('photoDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('photoScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
