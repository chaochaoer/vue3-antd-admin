<template>
  <a-row>
    <a-col :span="12">
      <a-card title="Card title" :bordered="false">
        <lineChart :chartData="{
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: '',
              backgroundColor: '#f87979',
              data: [40, 39, 10, 40, 39, 80, 40]
            }
          ]
        }" />
      </a-card>
    </a-col>
    <a-col :span="12">
      <a-card title="Card title" :bordered="false">
        <pieChart :chartData="{
          labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
          datasets: [
            {
              backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
              data: [40, 20, 80, 10]
            }
          ]
        }" />
      </a-card>
    </a-col>
  </a-row>
</template>
<script lang="ts" setup>
import pieChart from '@/components/chart/pieChart'
import lineChart from '@/components/chart/lineChart'
</script>
