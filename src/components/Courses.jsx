import React, { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import PropTypes from 'prop-types';
import endpoints from '../constants/endpoints';
import Header from './Header';
import FallbackSpinner from './FallbackSpinner';
import DetailModal from './DetailModal';
import '../css/timeline.css';

function Courses(props) {
  const { header } = props;
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(endpoints.courses, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <div className="section-content-container">
          <Fade triggerOnce>
            <div className="tl tl--courses">
              {data.courses?.map((item) => (
                <div
                  className="tl-item tl-item--clickable"
                  key={item.cardTitle + item.title}
                  onClick={() => setSelected(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') setSelected(item); }}
                >
                  <div className="tl-node--icon">
                    {item.image ? (
                      <img src={item.image} alt={item.cardTitle} />
                    ) : (
                      <span className="tl-thumb-placeholder">
                        {item.cardTitle.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="tl-card">
                    <div className="tl-date">{item.title}</div>
                    <h3 className="tl-title">{item.cardTitle}</h3>
                    <div className="tl-subtitle">
                      <span className="accent">{item.cardSubtitle}</span>
                    </div>
                    {item.cardDetailedText && (
                      <div className="tl-detail">{item.cardDetailedText}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      ) : <FallbackSpinner /> }
      {selected && (
        <DetailModal item={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

Courses.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Courses;