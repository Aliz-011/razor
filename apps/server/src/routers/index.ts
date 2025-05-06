
import { db2 } from "../db";
import {
  protectedProcedure, publicProcedure,
  router,
} from "../lib/trpc";

import { fmcRouter } from "./fmc";
import { revenueCVMRouter } from "./revenue-cvm";
import { revenueGrossRouter } from "./revenue-gross";
import { newSalesRouter } from "./revenue-new-sales";
import { revenueRedeemPVRouter } from "./revenue-redeem-pv";
import { usesRouter } from "./user";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: "This is private",
      user: ctx.session.user,
    };
  }),
  areas: router({
    areas: publicProcedure.query(async () => {
      return await db2.query.regionals.findMany({
        with: {
          branches: {
            with: {
              subbranches: {
                with: {
                  clusters: {
                    with: {
                      kabupatens: true
                    }
                  }
                }
              }
            }
          }
        }
      })
    }),
    fmcAreas: publicProcedure.query(async () => {
      return await db2.query.regionals.findMany({
        with: {
          branches: {
            with: {
              woks: {
                with: {
                  stos: true
                }
              }
            }
          }
        }
      })
    })
  }),
  user: usesRouter,
  revenueGross: revenueGrossRouter,
  cvm: revenueCVMRouter,
  newSales: newSalesRouter,
  redeemPv: revenueRedeemPVRouter,
  fmc: fmcRouter
});
export type AppRouter = typeof appRouter;
