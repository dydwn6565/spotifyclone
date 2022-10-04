import React from "react";
import Album from "../../components/Album";
import LibraryHead from "../../components/LibraryHead";
import Sidebar from "../../components/Sidebar";

type Props = {};

export default function albums({}: Props) {
  return (
    <div>
      <div className="flex">
        <div>
          <Sidebar />
        </div>

        <div>
          <LibraryHead />
          <Album />
        </div>
      </div>
    </div>
  );
}
