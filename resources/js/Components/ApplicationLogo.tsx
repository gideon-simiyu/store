import { SVGAttributes } from 'react';

export default function ApplicationLogo({color = ""}) {
    return (
        <div className="text-indigo-700 dark:text-indigo-400 flex flex-col items-start font-extrabold">
              <div className="tracking-wide">
                  <span>Threads</span>
              </div>
              <div className="tracking-wide ms-7 relative">
                  <span>&Trends</span>
                  <span
                      className="absolute -left-5 top-0 text-sm"
                      aria-hidden="true"
                  >
                      &#x25B2;
                  </span>
              </div>
          </div>
    );
}
