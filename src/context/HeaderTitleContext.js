import React from "react";

const HeaderTitleContext = React.createContext(null);

export const useSetHeaderTitle = () => {
	const setTitle = React.useContext(HeaderTitleContext);
	if (!setTitle) {
		throw new Error(
			"useSetHeaderTitle must be used within a HeaderTitleProvider"
		);
	}
	return setTitle;
};

export default HeaderTitleContext;
