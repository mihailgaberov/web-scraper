import React from "react";

function Grid({ listings }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {listings.map((listing, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg p-4 text-center"
        >
          <h3 className="text-blue-950 text-lg font-semibold mb-2">
            {listing.title}
          </h3>
          <p className="text-gray-600">{listing.price}</p>
          <a
            href={listing.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-blue-500 hover:underline"
          >
            View Listing
          </a>
        </div>
      ))}
    </div>
  );
}

export default Grid;
