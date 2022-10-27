import React, { useState, useEffect } from 'react';

export default function LoginTable(prosp) {
	return (
		<tr>
			<td>
				<input
					type="checkbox"
					onChange={event =>
						prosp.toDelete(event.target.id, event.target.checked)
					}
					name="idLogin"
					id={prosp.id}
				/>
			</td>
			<td>
				<input type="text" defaultValue={prosp.email} />
			</td>
			<td>
				<input type="text" defaultValue={prosp.password} />
			</td>
		</tr>
	);
}
