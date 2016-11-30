class UtilService {

	abstractMethod(name) {
		throw new Error('Method ' + name + ' must be defined in class.');
	}
}

export default new UtilService();