export interface RevenueBase {
    name: string;
    currMonthRevenue: number;
    currMonthTarget: number;
    currYtdRevenue: number;
    prevYtdRevenue: number;
    prevMonthRevenue: number;
    prevYearCurrMonthRevenue: number;
}

export interface Kabupaten extends RevenueBase { }

export interface Cluster extends RevenueBase {
    kabupatens: Kabupaten[]
}

export interface Subbranch extends RevenueBase {
    clusters: Cluster[];
};

export interface Branch extends RevenueBase {
    subbranches: Subbranch[];
};

export interface Regional extends RevenueBase {
    branches: Branch[];
};
