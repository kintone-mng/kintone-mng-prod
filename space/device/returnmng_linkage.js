(function() {
  'use strict';

  kintone.events.on('app.record.edit.show',async function(event) {
    var linkage_return=setBtn('btn_linkage_return','シリアルテーブル作成');
    $('#'+linkage_return.id).on('click', function(){
      startLoad();
      var eRecord = kintone.app.record.get();
      let createDLResult = createDeviceList(eRecord)
      if(!createDLResult.result){
        endLoad();
        return event;
      } else {
        eRecord.record.sNums.value = '';
        eRecord.record.returnDate_into.value = '';
        eRecord.record.returnCheacker_into.value = '';
        eRecord.record.sState_into.value = '';
        eRecord.record.deviceList.value = createDLResult.data;
        console.log(eRecord.record.deviceList.value);
      }

      endLoad();
      kintone.app.record.set(eRecord);
    });

    return event;
  });
})();

function createDeviceList(eRecord){
  let snArray = (eRecord.record.sNums.value).split(/\r\n|\n/);
  for(const snums of snArray){
    if(!snums || !snums.match(/\S/g)){
      alert('空白文字か空の改行が含まれています')
      return {result: false, error: {target: 'createDeviceList', code: 'createDeviceList_snumEmpty'}};
    }
  }

  let deviceList = eRecord.record.deviceList.value;
  for(const snums of snArray){
    let deviceJson = {
      value:{
        mName:{
          value: "",
          type: "SINGLE_LINE_TEXT"
        },
        nCode:{
          value: "",
          type: "SINGLE_LINE_TEXT"
        },
        sNumID:{
          value: "",
          type: "NUMBER"
        },
        sNum:{
          value: snums,
          lookup:true,
          type: "SINGLE_LINE_TEXT"
        },
        returnCheacker:{
          value: eRecord.record.returnCheacker_into.value,
          type: "SINGLE_LINE_TEXT"
        },
        returnDate:{
          value: eRecord.record.returnDate_into.value,
          type: "DATE"
        },
        sState:{
          value: eRecord.record.sState_into.value,
          type: "DROP_DOWN"
        }
      }
    }
    deviceList.push(deviceJson)
  }

  return {result: true, data: deviceList, error: {target: 'createDeviceList', code: 'createDeviceList_success'}};
}