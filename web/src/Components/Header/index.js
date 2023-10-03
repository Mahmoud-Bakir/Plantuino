import React from "react";

export const Header = ({
  count,
  t1,
  t2,
  t3,
  t4,
  t5,
  t6,
  t7,
  t8,
  t9,
  t10,
  t11,
}) => {
  return (
    <>
      {count === 9 && (
        <tr>
          <th>{t1}</th>
          <th>{t2}</th>
          <th>{t3}</th>
          <th>{t4}</th>
          <th>{t5}</th>
          <th>{t6}</th>
          <th>{t7}</th>
          <th>{t8}</th>
          <th>{t9}</th>
        </tr>
      )}
      {count === 8 && (
        <tr>
          <th>{t1}</th>
          <th>{t2}</th>
          <th>{t3}</th>
          <th>{t4}</th>
          <th>{t5}</th>
          <th>{t6}</th>
          <th>{t7}</th>
          <th>{t8}</th>
        </tr>
      )}
    </>
  );
};
export default Header;
