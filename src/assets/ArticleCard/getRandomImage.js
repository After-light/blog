import cover_1 from '@@share/images/cover_1.jpg';
import cover_2 from '@@share/images/cover_2.jpg';
import cover_3 from '@@share/images/cover_3.jpg';
import cover_4 from '@@share/images/cover_4.jpg';
import cover_5 from '@@share/images/cover_5.jpg';
import cover_6 from '@@share/images/cover_6.jpg';
import cover_7 from '@@share/images/cover_7.jpg';
import cover_8 from '@@share/images/cover_8.jpg';
import cover_9 from '@@share/images/cover_9.jpg';
import cover_10 from '@@share/images/cover_10.jpg';
import cover_11 from '@@share/images/cover_11.jpg';
import cover_12 from '@@share/images/cover_12.jpg';
import cover_13 from '@@share/images/cover_13.jpg';
import cover_14 from '@@share/images/cover_14.jpg';
import cover_15 from '@@share/images/cover_15.jpg';
import cover_16 from '@@share/images/cover_16.jpg';
import cover_17 from '@@share/images/cover_17.jpg';
import cover_18 from '@@share/images/cover_18.jpg';
import cover_19 from '@@share/images/cover_19.jpg';
import cover_20 from '@@share/images/cover_20.jpg';

const IMAGE_LIST = [
  cover_1,
  cover_2,
  cover_3,
  cover_4,
  cover_5,
  cover_6,
  cover_7,
  cover_8,
  cover_9,
  cover_10,
  cover_11,
  cover_12,
  cover_13,
  cover_14,
  cover_15,
  cover_16,
  cover_17,
  cover_18,
  cover_19,
  cover_20,
];

export default () => {
  return IMAGE_LIST[Math.floor(Math.random() * (IMAGE_LIST.length - 1))];
};
