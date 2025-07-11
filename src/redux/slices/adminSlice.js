import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = "https://service-provider.runasp.net/api/Admin";
const REVIEWS_API_URL = "https://service-provider.runasp.net/api/Reviews";
const ORDERS_API_URL = "https://service-provider.runasp.net/api/Orders";
const VENDORS_API_URL = "https://service-provider.runasp.net/api/Vendors";

// Async thunk for fetching today's stats
export const fetchTodayStats = createAsyncThunk(
    'admin/fetchTodayStats',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/today-stats`, {
                headers: {
                    accept: '*/*',
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch today stats');
        }
    }
);

// Async thunk for fetching top vendors
export const fetchTopVendors = createAsyncThunk(
    'admin/fetchTopVendors',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/top-vendors`, {
                headers: {
                    accept: '*/*',
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch top vendors');
        }
    }
);

// Async thunk for fetching project summary
export const fetchProjectSummary = createAsyncThunk(
    'admin/fetchProjectSummary',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/project-summary`, {
                headers: {
                    accept: '*/*',
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch project summary');
        }
    }
);

// Updated async thunk for fetching all users
export const fetchAllUsers = createAsyncThunk(
    'admin/fetchAllUsers',
    async (params, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const {
                pageNumber = 1,
                pageSize = 10,
                searchValue,
                sortColumn,
                sortDirection,
                dateFilter,
                status,
            } = params || {};

            const response = await axios.get(`${API_BASE_URL}/all-users`, {
                headers: {
                    accept: 'text/plain',
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    PageNumer: pageNumber,
                    PageSize: pageSize,
                    SearchValue: searchValue,
                    SortColumn: sortColumn,
                    SortDirection: sortDirection,
                    DateFilter: dateFilter,
                    Status: status,
                }
                
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch users');
        }
    }
);

// Updated async thunk for fetching all transactions
export const fetchAllTransactions = createAsyncThunk(
    'admin/fetchAllTransactions',
    async (params, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const {
                pageNumber = 1,
                pageSize = 10,
                searchValue,
                sortColumn,
                sortDirection,
                DateFilter,
                Statuses,
                PaymentMethods
            } = params || {};

            const queryParams = [];
            if (pageNumber) queryParams.push(`PageNumer=${pageNumber}`);
            if (pageSize) queryParams.push(`PageSize=${pageSize}`);
            if (searchValue) queryParams.push(`SearchValue=${encodeURIComponent(searchValue)}`);
            if (sortColumn) queryParams.push(`SortColumn=${encodeURIComponent(sortColumn)}`);
            if (sortDirection) queryParams.push(`SortDirection=${encodeURIComponent(sortDirection)}`);
            if (DateFilter) queryParams.push(`DateFilter=${encodeURIComponent(DateFilter)}`);
            if (Statuses && Array.isArray(Statuses) && Statuses.length > 0) {
                Statuses.forEach(status => queryParams.push(`Statuses=${encodeURIComponent(status)}`));
            }
            if (PaymentMethods && Array.isArray(PaymentMethods) && PaymentMethods.length > 0) {
                PaymentMethods.forEach(status => queryParams.push(`PaymentMethods=${encodeURIComponent(status)}`));
            }

            const queryString = queryParams.join('&');
            const url = queryString
                ? `${API_BASE_URL}/all-transactions?${queryString}`
                : `${API_BASE_URL}/all-transactions`;

            const response = await axios.get(url, {
                headers: {
                    accept: 'text/plain',
                    Authorization: `Bearer ${token}`,
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return rejectWithValue(error.response?.data || 'Failed to fetch transactions');
        }
    }
);
// Async thunk for fetching user-vendor reviews
export const fetchUserVendorReviews = createAsyncThunk(
    'admin/fetchUserVendorReviews',
    async (params, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const {
                pageNumber = 1,
                pageSize = 10,
                searchValue,
                sortColumn,
                sortDirection,
                businessTypes,
                minRating,
                maxRating,
                status,
                statuses
            } = params || {};

            const response = await axios.get(`${REVIEWS_API_URL}/user-vendor-reviews`, {
                headers: {
                    accept: 'text/plain',
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    PageNumer: pageNumber,
                    PageSize: pageSize,
                    SearchValue: searchValue,
                    SortColumn: sortColumn,
                    SortDirection: sortDirection,
                    BusinessTypes: businessTypes,
                    MinRating: minRating,
                    MaxRating: maxRating,
                    Status: status,
                    Statuses: statuses
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch user-vendor reviews');
        }
    }
);

// Async thunk for fetching all orders
export const fetchAllOrders = createAsyncThunk(
    'admin/fetchAllOrders',
    async (params, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const {
                pageNumber = 1,
                pageSize = 10,
                searchValue,
                sortColumn,
                sortDirection,
                BusinessTypes,
                DateFilter,
                Statuses
            } = params || {};

            // Manually construct query string
            const queryParams = [];
            if (pageNumber) queryParams.push(`PageNumer=${pageNumber}`);
            if (pageSize) queryParams.push(`PageSize=${pageSize}`);
            if (searchValue) queryParams.push(`SearchValue=${encodeURIComponent(searchValue)}`);
            if (sortColumn) queryParams.push(`SortColumn=${encodeURIComponent(sortColumn)}`);
            if (sortDirection) queryParams.push(`SortDirection=${encodeURIComponent(sortDirection)}`);
            if (BusinessTypes && Array.isArray(BusinessTypes)) {
                BusinessTypes.forEach(type => queryParams.push(`BusinessTypes=${encodeURIComponent(type)}`));
            }
            if (DateFilter) queryParams.push(`DateFilter=${encodeURIComponent(DateFilter)}`);
            if (Statuses && Array.isArray(Statuses) && Statuses.length > 0) {
                Statuses.forEach(status => queryParams.push(`Statuses=${encodeURIComponent(status)}`));
            }

            const queryString = queryParams.join('&');
            const url = queryString ? `${ORDERS_API_URL}/all-orders?${queryString}` : `${ORDERS_API_URL}/all-orders`;

            const response = await axios.get(url, {
                headers: {
                    accept: 'text/plain',
                    Authorization: `Bearer ${token}`,
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return rejectWithValue(error.response?.data || 'Failed to fetch orders');
        }
    }
);

export const fetchVendorByID = createAsyncThunk(
    'admin/fetchVendorByID',
    async (vendorId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${VENDORS_API_URL}/${vendorId}`, {
                headers: {
                    accept: 'text/plain',
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch vendor details');
        }
    }
);

export const fetchVendorMenu = createAsyncThunk(
    'admin/fetchVendorMenu',
    async (vendorId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${VENDORS_API_URL}/${vendorId}/menu`, {
                headers: {
                    accept: 'text/plain',
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch vendor menu');
        }
    }
);

export const fetchBusinessTypes = createAsyncThunk(
    'admin/fetchBusinessTypes',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${VENDORS_API_URL}/BusinessTypes`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch BusinessTypes');
        }
    }
)

export const fetchVendorRatings = createAsyncThunk(
    'admin/fetchVendorRatings',
    async (params, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const {
                vendorId,
                pageNumber = 1,
                pageSize = 10,
                searchValue,
                sortColumn,
                sortDirection,
                BusinessTypes,
                MinRating,
                MaxRating,
                DateFilter,
                Status,
                Statuses
            } = params || {};

            const queryParams = [];
            if (vendorId) queryParams.push(`vendorId=${vendorId}`);
            if (pageNumber) queryParams.push(`PageNumer=${pageNumber}`);
            if (pageSize) queryParams.push(`PageSize=${pageSize}`);
            if (searchValue) queryParams.push(`SearchValue=${encodeURIComponent(searchValue)}`);
            if (sortColumn) queryParams.push(`SortColumn=${encodeURIComponent(sortColumn)}`);
            if (sortDirection) queryParams.push(`SortDirection=${encodeURIComponent(sortDirection)}`);
            if (BusinessTypes && Array.isArray(BusinessTypes)) {
                BusinessTypes.forEach(type => queryParams.push(`BusinessTypes=${encodeURIComponent(type)}`));
            }
            if (MinRating) queryParams.push(`MinRating=${MinRating}`);
            if (MaxRating) queryParams.push(`MaxRating=${MaxRating}`);
            if (DateFilter) queryParams.push(`DateFilter=${encodeURIComponent(DateFilter)}`);
            if (Status !== undefined) queryParams.push(`Status=${Status}`);
            if (Statuses && Array.isArray(Statuses) && Statuses.length > 0) {
                Statuses.forEach(status => queryParams.push(`Statuses=${encodeURIComponent(status)}`));
            }

            const queryString = queryParams.join('&');
            const url = queryString ? `${VENDORS_API_URL}/vendors-rating?${queryString}` : `${VENDORS_API_URL}/vendors-rating`;

            const response = await axios.get(url, {
                headers: {
                    accept: 'text/plain',
                    Authorization: `Bearer ${token}`,
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return rejectWithValue(error.response?.data || 'Failed to fetch vendor ratings');
        }
    }
);

export const fetchUserTransactions = createAsyncThunk(
    'admin/fetchUserTransactions',
    async (params, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const {
                userId,
                pageNumber = 1,
                pageSize = 10,
                searchValue,
                sortColumn,
                sortDirection,
                BusinessTypes,
                MinRating,
                MaxRating,
                DateFilter,
                Status,
                Statuses
            } = params || {};

            const queryParams = [];
            if (pageNumber) queryParams.push(`PageNumer=${pageNumber}`);
            if (pageSize) queryParams.push(`PageSize=${pageSize}`);
            if (searchValue) queryParams.push(`SearchValue=${encodeURIComponent(searchValue)}`);
            if (sortColumn) queryParams.push(`SortColumn=${encodeURIComponent(sortColumn)}`);
            if (sortDirection) queryParams.push(`SortDirection=${encodeURIComponent(sortDirection)}`);
            if (BusinessTypes && Array.isArray(BusinessTypes)) {
                BusinessTypes.forEach(type => queryParams.push(`BusinessTypes=${encodeURIComponent(type)}`));
            }
            if (MinRating) queryParams.push(`MinRating=${MinRating}`);
            if (MaxRating) queryParams.push(`MaxRating=${MaxRating}`);
            if (DateFilter) queryParams.push(`DateFilter=${encodeURIComponent(DateFilter)}`);
            if (Status !== undefined) queryParams.push(`Status=${Status}`);
            if (Statuses && Array.isArray(Statuses) && Statuses.length > 0) {
                Statuses.forEach(status => queryParams.push(`Statuses=${encodeURIComponent(status)}`));
            }

            const queryString = queryParams.join('&');
            const url = queryString
                ? `${API_BASE_URL}/users/${userId}/all-transactions?${queryString}`
                : `${API_BASE_URL}/users/${userId}/all-transactions`;

            const response = await axios.get(url, {
                headers: {
                    accept: 'text/plain',
                    Authorization: `Bearer ${token}`,
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return rejectWithValue(error.response?.data || 'Failed to fetch user transactions');
        }
    }
);

export const fetchOrderById = createAsyncThunk(
    'admin/fetchOrderById',
    async (orderId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`${ORDERS_API_URL}/${orderId}`, {
                headers: {
                    accept: 'text/plain',
                    Authorization: `Bearer ${token}`,
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return rejectWithValue(error.response?.data || 'Failed to fetch order details');
        }
    }
);

export const fetchTransactionsStatus = createAsyncThunk(
    'admin/fetchTransactionsStatus',
    async (orderId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`${API_BASE_URL}/transaction-stats`, {
                headers: {
                    accept: 'text/plain',
                    Authorization: `Bearer ${token}`,
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return rejectWithValue(error.response?.data || 'Failed to fetch order details');
        }
    }
);

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        todayStats: {
            newUsersCount: 0,
            ordersCount: 0,
            revenueToday: 0,
            vendorsCount: 0
        },
        topVendors: [],
        projectSummary: {
            totalUsersCount: 0,
            totalVendorsCount: 0,
            totalRevenue: 0
        },
        users: {
            items: [],
            pageNumber: 1,
            totalPages: 1,
            hasPreviousPage: false,
            hasNextPage: false
        },
        transactions: {
            items: []
        },
        reviews: {
            items: [],
            pageNumber: 1,
            totalPages: 1,
            hasPreviousPage: false,
            hasNextPage: false
        },
        orders: {
            items: [],
            pageNumber: 1,
            totalPages: 1,
            hasPreviousPage: false,
            hasNextPage: false
        },
        usersCount: {
            totalApplicationUsers: 0
        },
        transactionsCount: {
            totalTransactionsCount: 0
        },
        vendorRatings: {
            items: [],
            pageNumber: 1,
            totalPages: 1,
            hasPreviousPage: false,
            hasNextPage: false
        },
        userTransactions: {
            items: [],
            pageNumber: 1,
            totalPages: 1,
            hasPreviousPage: false,
            hasNextPage: false
        },
        userTransactionsLoading: false,
        userTransactionsError: null,
        vendorRatingsLoading: false,
        vendorRatingsError: null,
        vendorDetails: null,
        vendorDetailsLoading: false,
        vendorDetailsError: null,
        vendorMenu: [],
        vendorMenuLoading: false,
        vendorMenuError: null,
        BusinessTypes: [],
        orderDetails: null,
        orderDetailsLoading: false,
        orderDetailsError: null,
        transactionStatus: {},
        loading: false,
        error: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
            state.vendorDetailsError = null;
            state.vendorMenuError = null;
        },
        clearVendorDetails: (state) => {
            state.vendorDetails = null;
            state.vendorDetailsError = null;
        },
        clearVendorMenu: (state) => {
            state.vendorMenu = [];
            state.vendorMenuError = null;
        },
        clearVendorRatings: (state) => {
            state.vendorRatings = {
                items: [],
                pageNumber: 1,
                totalPages: 1,
                hasPreviousPage: false,
                hasNextPage: false
            };
            state.vendorRatingsError = null;
        },
        clearUserTransactions: (state) => {
            state.userTransactions = {
                items: [],
                pageNumber: 1,
                totalPages: 1,
                hasPreviousPage: false,
                hasNextPage: false
            };
            state.userTransactionsError = null;
        },
        clearOrderDetails: (state) => {
            state.orderDetails = null;
            state.orderDetailsError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Today Stats
            .addCase(fetchTodayStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodayStats.fulfilled, (state, action) => {
                state.loading = false;
                state.todayStats = action.payload;
            })
            .addCase(fetchTodayStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Top Vendors
            .addCase(fetchTopVendors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTopVendors.fulfilled, (state, action) => {
                state.loading = false;
                state.topVendors = action.payload;
            })
            .addCase(fetchTopVendors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Project Summary
            .addCase(fetchProjectSummary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjectSummary.fulfilled, (state, action) => {
                state.loading = false;
                state.projectSummary = action.payload;
            })
            .addCase(fetchProjectSummary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // All Users
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = {
                    items: action.payload.items,
                    pageNumber: action.payload.pageNumber,
                    totalPages: action.payload.totalPages,
                    hasPreviousPage: action.payload.hasPreviousPage,
                    hasNextPage: action.payload.hasNextPage
                };
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // All Transactions
            .addCase(fetchAllTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = {
                    items: action.payload.items,
                    pageNumber: action.payload.pageNumber,
                    totalPages: action.payload.totalPages,
                    hasPreviousPage: action.payload.hasPreviousPage,
                    hasNextPage: action.payload.hasNextPage
                };
            })
            .addCase(fetchAllTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // User Vendor Reviews
            .addCase(fetchUserVendorReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserVendorReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = {
                    items: action.payload.items,
                    pageNumber: action.payload.pageNumber,
                    totalPages: action.payload.totalPages,
                    hasPreviousPage: action.payload.hasPreviousPage,
                    hasNextPage: action.payload.hasNextPage
                };
            })
            .addCase(fetchUserVendorReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // All Orders
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = {
                    items: action.payload.items,
                    pageNumber: action.payload.pageNumber,
                    totalPages: action.payload.totalPages,
                    hasPreviousPage: action.payload.hasPreviousPage,
                    hasNextPage: action.payload.hasNextPage
                };
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // BusinessTypes
            .addCase(fetchBusinessTypes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBusinessTypes.fulfilled, (state, action) => {
                state.loading = false;
                state.BusinessTypes = action.payload;
            })
            .addCase(fetchBusinessTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Vendor Details
            .addCase(fetchVendorByID.pending, (state) => {
                state.vendorDetailsLoading = true;
                state.vendorDetailsError = null;
            })
            .addCase(fetchVendorByID.fulfilled, (state, action) => {
                state.vendorDetailsLoading = false;
                state.vendorDetails = action.payload;
            })
            .addCase(fetchVendorByID.rejected, (state, action) => {
                state.vendorDetailsLoading = false;
                state.vendorDetailsError = action.payload;
            })
            // Vendor Menu
            .addCase(fetchVendorMenu.pending, (state) => {
                state.vendorMenuLoading = true;
                state.vendorMenuError = null;
            })
            .addCase(fetchVendorMenu.fulfilled, (state, action) => {
                state.vendorMenuLoading = false;
                state.vendorMenu = action.payload;
            })
            .addCase(fetchVendorMenu.rejected, (state, action) => {
                state.vendorMenuLoading = false;
                state.vendorMenuError = action.payload;
            })
            // Vendor Ratings
            .addCase(fetchVendorRatings.pending, (state) => {
                state.vendorRatingsLoading = true;
                state.vendorRatingsError = null;
            })
            .addCase(fetchVendorRatings.fulfilled, (state, action) => {
                state.vendorRatingsLoading = false;
                state.vendorRatings = {
                    items: action.payload.items,
                    pageNumber: action.payload.pageNumber,
                    totalPages: action.payload.totalPages,
                    hasPreviousPage: action.payload.hasPreviousPage,
                    hasNextPage: action.payload.hasNextPage
                };
            })
            .addCase(fetchVendorRatings.rejected, (state, action) => {
                state.vendorRatingsLoading = false;
                state.vendorRatingsError = action.payload;
            })
            // User Transactions
            .addCase(fetchUserTransactions.pending, (state) => {
                state.userTransactionsLoading = true;
                state.userTransactionsError = null;
            })
            .addCase(fetchUserTransactions.fulfilled, (state, action) => {
                state.userTransactionsLoading = false;
                state.userTransactions = {
                    items: action.payload.items,
                    pageNumber: action.payload.pageNumber,
                    totalPages: action.payload.totalPages,
                    hasPreviousPage: action.payload.hasPreviousPage,
                    hasNextPage: action.payload.hasNextPage
                };
            })
            .addCase(fetchUserTransactions.rejected, (state, action) => {
                state.userTransactionsLoading = false;
                state.userTransactionsError = action.payload;
            })
            // Order Details
            .addCase(fetchOrderById.pending, (state) => {
                state.orderDetailsLoading = true;
                state.orderDetailsError = null;
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.orderDetailsLoading = false;
                state.orderDetails = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.orderDetailsLoading = false;
                state.orderDetailsError = action.payload;
            })
            // Transactions status
            .addCase(fetchTransactionsStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactionsStatus.fulfilled, (state, action) => {
                state.loading = true;
                state.transactionStatus = action.payload;
            })
            .addCase(fetchTransactionsStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const {
    clearError,
    clearVendorDetails,
    clearVendorMenu,
    clearVendorRatings,
    clearUserTransactions,
    clearOrderDetails
} = adminSlice.actions;
export default adminSlice.reducer;