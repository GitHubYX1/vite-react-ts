import { memo } from "react";
import { HeaderWrapper } from "./style";
import { headerLinks } from "../../common/local-data";
import { NavLink } from "react-router-dom";

export default memo(function AppHeader() {
  return (
    <HeaderWrapper>
      <div className="content">
        <div className="select-list">
          {headerLinks.map((item, index) => {
            return (
              <div className="select-item" key={index}>
                <NavLink to={item.link}>{item.title}</NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </HeaderWrapper>
  );
});
