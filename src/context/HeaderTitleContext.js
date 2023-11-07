import React from "react";

const HeaderTitleContext = React.createContext({
	headerTitle: "Home",
	setHeaderTitle: () => {},
});

export const useSetHeaderTitle = () => {
	const context = React.useContext(HeaderTitleContext);
	if (!context) {
		throw new Error(
			"useSetHeaderTitle must be used within a HeaderTitleProvider"
		);
	}
	return context.setHeaderTitle;
};

export default HeaderTitleContext;
