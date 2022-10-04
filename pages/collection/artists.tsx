import React from "react";
import Artist from "../../components/Artist";
import LibraryHead from "../../components/LibraryHead";
import Sidebar from "../../components/Sidebar";

type Props = {};

export default function artists({}: Props) {
  return (
    <div>
      <div className="flex ">
        <div>
          <Sidebar />
        </div>

        <div >
          <LibraryHead />
          <Artist />
        </div>
      </div>
    </div>
  );
}
