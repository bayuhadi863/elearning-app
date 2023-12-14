import React from 'react';

const ProfileDetailItem = ({ rows }) => {
  return (
    <div className="my-2 text-gray-600">
      <table className="">
        <tbody>
          {rows.map((row) => (
            <tr key={row.title}>
              <td>
                <b>{row.title}</b>
              </td>
              <td>: {row.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileDetailItem;
