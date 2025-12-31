export default class Error {
	public readonly status: number;
	public readonly msg: string;

	constructor(props: { status: number; msg: string }) {
		this.status = props.status;
		this.msg = props.msg;
	}
}
