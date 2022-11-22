import React from "react";

import LibraryHead from "../../components/LibraryHead";
import EmptyPlaylistsImage from "../../components/EmptyPlaylistsImage";

import Sidebar from "../../components/Sidebar";

type Props = {};

function mylibrary({}: Props) {
  return (
    <div>
      <div className="flex ">
        <div>
          <Sidebar />
        </div>

        <div>
          <LibraryHead />
          <EmptyPlaylistsImage />
        </div>
      </div>
    </div>
  );
}

export default mylibrary;
