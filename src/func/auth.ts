export function BasicAuth(headers: Headers, user: string, pass: string) {
	const authorization = headers.get("authorization");
	if (!authorization) {
		return false;
	} else {
		const [scheme, encoded] = authorization.split(" ");
		if (!encoded || scheme !== "Basic") {
			return false;
		} else {
			const buffer = Uint8Array.from(atob(encoded), (character) => character.charCodeAt(0));
			const decoded = new TextDecoder().decode(buffer).normalize();
			console.log(decoded);
			const [username, password] = decoded.split(":");

			if (username === user && password === pass) {
				return true;
			}
		}
	}
}
