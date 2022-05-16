export default function userPictureSource(apiRoot, picture) {
	const DEFAULT_PICTURE_SOURCE = "/default_user_picture.png";

	const pictureSource = picture
		? `${apiRoot}/images/user/${picture}`
		: DEFAULT_PICTURE_SOURCE;

	return pictureSource;
}
