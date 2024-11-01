import { IExtraLocatorData } from 'daohq-shared/types'

export const metricsScreenConfigs: IExtraLocatorData[] = [
  {
    name: 'screen_treasury408.001',
    extras: {
      metrics: 'Treasury',
      link: 'https://decentraland.org/governance/',
      ignoreScheme: true
    }
  },
  {
    name: 'screen_voters405.001',
    extras: {
      metrics: 'TopVoters',
      link: 'https://decentraland.org/governance/#engagement',
      ignoreScheme: true
    }
  },
  {
    name: 'screen_participation407.001',
    extras: {
      metrics: 'Participation',
      link: 'https://decentraland.org/governance/',
      ignoreScheme: true
    }
  },
  {
    name: 'screen_proposals406.001',
    extras: {
      metrics: 'Proposals',
      link: 'https://decentraland.org/governance/',
      ignoreScheme: true
    }
  },
  {
    name: 'screen_balance701.001',
    extras: {
      metrics: 'Balances',
      link: 'https://decentraland.org/governance/transparency/',
      ignoreScheme: true
    }
  },
  {
    name: 'screen_income703.001',
    extras: {
      metrics: 'Last30dIncome',
      link: 'https://decentraland.org/governance/transparency/',
      ignoreScheme: true
    }
  },
  {
    name: 'screen_vesting702.001',
    extras: {
      metrics: 'DaoVestingContract',
      link: 'https://decentraland.org/governance/transparency/',
      ignoreScheme: true
    }
  },
  {
    name: 'screen_funding704.001',
    extras: {
      metrics: 'FundingProvided',
      link: 'https://decentraland.org/governance/transparency/',
      ignoreScheme: true
    }
  },
  {
    name: 'screen_expenses705.001',
    extras: {
      metrics: 'Last30dExpenses',
      link: 'https://decentraland.org/governance/transparency/',
      ignoreScheme: true
    }
  },
  {
    name: 'screen_budget706.001',
    extras: {
      metrics: 'GrantsProgramBudget',
      link: 'https://decentraland.org/governance/transparency/',
      ignoreScheme: true
    }
  }
]
