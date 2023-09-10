
export const usersColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Full Name",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.photos} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "username",
    headerName: "Username",
    width: 120,
    
  },
  {
    field: "address",
    headerName: "address",
    width: 300,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    width: 120,
    
  },
  {
    field: "authorities.authority",
    headerName: "Role",
    width: 120,
    valueGetter: ({ row }) => row.authorities[0].authority
  },
];

export const productsColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "Product",
    headerName: "Product",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.photos} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "description",
    headerName: "Description",
    width: 300,
  },
  {
    field: "type",
    headerName: "Type",
    width: 80,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
];
export const categoryColumns = [
  { field: "id_Category", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Category",
    width: 300,
  }
];
export const rankColumns = [
  { field: "id_Rank", headerName: "ID", width: 70 },
  {
    field: "nameRank",
    headerName: "Rank",
    width: 250,
  },
  {
    field: "amountTotal",
    headerName: "Amount Spent",
    width: 250,
  },
  {
    field: "rateDiscount",
    headerName: "Rate Discount",
    width: 250,
  }
];
export const cartColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "Product",
    headerName: "Product",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.food.photos} alt="avatar" />
          {params.row.food.name}
        </div>
      );
    },
  },
  {
    field: "description",
    headerName: "Description",
    width: 300,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.food.description}`}>
          {params.row.food.description}
        </div>
      );
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 120,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.food.price}`}>
          {params.row.food.price}
        </div>
      );
    },
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 80,
  },
  {
    field: "totalPrice",
    headerName: "Total Price",
    width: 80,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.food.price * params.row.quantity}`}>
          {params.row.food.price * params.row.quantity}
        </div>
      );
    },
  },
];
export const checkoutColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "Product",
    headerName: "Product",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.food.photos} alt="avatar" />
          {params.row.food.name}
        </div>
      );
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 120,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.food.price}`}>
          {params.row.food.price}
        </div>
      );
    },
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 80,
  },
  {
    field: "totalPrice",
    headerName: "Total Price",
    width: 80,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.food.price * params.row.quantity}`}>
          {params.row.food.price * params.row.quantity}
        </div>
      );
    },
  },
];
