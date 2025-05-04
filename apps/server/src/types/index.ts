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
    branches: Branch[]
}

export interface CurrYtDRevenue {
    region: string;
    branch: string;
    subbranch: string;
    cluster: string;
    kabupaten: string;
    currYtdKabupatenRev: number;
    currYtdClusterRev: number
    currYtdSubbranchRev: number
    currYtdBranchRev: number
    currYtdRegionalRev: number
}
export interface PrevYtDRevenue {
    region: string;
    branch: string;
    subbranch: string;
    cluster: string;
    kabupaten: string;
    prevYtdKabupatenRev: number;
    prevYtdClusterRev: number
    prevYtdSubbranchRev: number
    prevYtdBranchRev: number
    prevYtdRegionalRev: number
}