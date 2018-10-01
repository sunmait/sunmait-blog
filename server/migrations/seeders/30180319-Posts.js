'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Posts',
      [
        {
          id: 1,
          UserId: 1,
          CreatedAt: new Date('December 17, 2017 15:00:00'),
          UpdatedAt: new Date('November 21, 2017 11:41:33'),
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
          Title: 'Post N1',
          ImageUrl: 'https://www.digitalimpact.co.uk/wp-content/uploads/2015/11/TechStockHeader.jpg',
        },
        {
          id: 2,
          UserId: 2,
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 21, 2017 11:41:33'),
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
          Title: 'Post N2',
          ImageUrl: 'https://www.digitalimpact.co.uk/wp-content/uploads/2015/11/TechStockHeader.jpg',
        },
        {
          id: 3,
          UserId: 1,
          CreatedAt: new Date('December 19, 2017 16:41:56'),
          UpdatedAt: new Date('December 21, 2017 11:41:33'),
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
          Title: 'Post N3',
          ImageUrl: 'https://www.digitalimpact.co.uk/wp-content/uploads/2015/11/TechStockHeader.jpg',
        },
        {
          id: 4,
          UserId: 2,
          CreatedAt: new Date('February 1, 2018 16:41:56'),
          UpdatedAt: new Date('February 21, 2018 11:41:33'),
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
          Title: 'Post N4',
          ImageUrl: 'https://www.digitalimpact.co.uk/wp-content/uploads/2015/11/TechStockHeader.jpg',
        },
        {
          id: 5,
          UserId: 3,
          CreatedAt: new Date('February 21, 2018 16:41:56'),
          UpdatedAt: new Date('February 21, 2018 19:41:33'),
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
          Title: 'Post N5',
          ImageUrl:
            'https://image.freepik.com/vector-gratis/vista-superior-espacio-de-trabajo-con-portatil-y-papeleria-en-la-mesa_1407-149.jpg',
        },
        {
          id: 6,
          UserId: 3,
          CreatedAt: new Date('February 25, 2018 16:41:56'),
          UpdatedAt: new Date('February 25, 2018 19:41:33'),
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
          Title: 'Post N6',
          ImageUrl:
            'https://res.cloudinary.com/dn27bg6qw/image/upload/v1538497645/landscape-water-flowers-158063.Kw1iZ_nwq9k1.jpg',
        },
        {
          id: 7,
          UserId: 1,
          CreatedAt: new Date('March 21, 2018 16:41:56'),
          UpdatedAt: new Date('March 21, 2018 19:41:33'),
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
          Title: 'Post N7',
          ImageUrl:
            'https://res.cloudinary.com/dn27bg6qw/image/upload/v1538497645/landscape-water-flowers-158063.Kw1iZ_nwq9k1.jpg',
        },
        {
          id: 8,
          UserId: 2,
          CreatedAt: new Date('March 28, 2018 16:41:56'),
          UpdatedAt: new Date('March 28, 2018 19:41:33'),
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
          Title: 'Post N8',
          ImageUrl:
            'https://res.cloudinary.com/dn27bg6qw/image/upload/v1538497645/landscape-water-flowers-158063.Kw1iZ_nwq9k1.jpg',
        },
        {
          id: 9,
          UserId: 3,
          CreatedAt: new Date('April 29, 2018 16:41:56'),
          UpdatedAt: new Date('April 29, 2018 19:41:33'),
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
          Title: 'Post N9',
          ImageUrl:
            'https://res.cloudinary.com/dn27bg6qw/image/upload/v1538497645/landscape-water-flowers-158063.Kw1iZ_nwq9k1.jpg',
        },
        {
          id: 10,
          UserId: 2,
          CreatedAt: new Date('April 30, 2018 16:41:56'),
          UpdatedAt: new Date('April 30, 2018 19:41:33'),
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
          Title: 'Post N10',
          ImageUrl:
            'https://res.cloudinary.com/dn27bg6qw/image/upload/v1538497645/landscape-water-flowers-158063.Kw1iZ_nwq9k1.jpg',
        },
        {
          id: 11,
          UserId: 1,
          CreatedAt: new Date('May 20, 2018 16:41:56'),
          UpdatedAt: new Date('May 20, 2018 19:41:33'),
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
          Title: 'Post N11',
          ImageUrl:
            'https://res.cloudinary.com/dn27bg6qw/image/upload/v1538497645/landscape-water-flowers-158063.Kw1iZ_nwq9k1.jpg',
        },
        {
          id: 12,
          UserId: 1,
          CreatedAt: new Date('May 21, 2018 16:41:56'),
          UpdatedAt: new Date('May 21, 2018 19:41:33'),
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
          Title: 'Post N12',
          ImageUrl:
            'https://res.cloudinary.com/dn27bg6qw/image/upload/v1538497645/landscape-water-flowers-158063.Kw1iZ_nwq9k1.jpg',
        },
        {
          id: 13,
          UserId: 3,
          CreatedAt: new Date('June 21, 2018 16:41:56'),
          UpdatedAt: new Date('June 21, 2018 19:41:33'),
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
          Title: 'Post N13',
          ImageUrl:
            'https://res.cloudinary.com/dn27bg6qw/image/upload/v1538497645/landscape-water-flowers-158063.Kw1iZ_nwq9k1.jpg',
        },
        {
          id: 14,
          UserId: 2,
          CreatedAt: new Date('June 22, 2018 16:41:56'),
          UpdatedAt: new Date('June 22, 2018 19:41:33'),
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
          Title: 'Post N14',
          ImageUrl:
            'https://res.cloudinary.com/dn27bg6qw/image/upload/v1538497645/landscape-water-flowers-158063.Kw1iZ_nwq9k1.jpg',
        },
        {
          id: 15,
          UserId: 3,
          CreatedAt: new Date('July 1, 2018 16:41:56'),
          UpdatedAt: new Date('July 1, 2018 19:41:33'),
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
          Title: 'Post N15',
          ImageUrl:
            'https://res.cloudinary.com/dn27bg6qw/image/upload/v1538497645/landscape-water-flowers-158063.Kw1iZ_nwq9k1.jpg',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  },
};
