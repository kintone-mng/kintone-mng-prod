(function(){
  'use strict';
  /** イベント　通常イベント発生時 */
  // 一覧表示
  kintone.events.on('app.record.index.show', function(event){
    startLoad();
    /** 初期設定 start */
    /** 初期設定 end */
    endLoad();
    return event;
  });
  // 新規レコード作成
  kintone.events.on('app.record.create.show', function(event){
    startLoad();
    /** 初期設定 start */
    acl_defalut(event);
    /** 初期設定 end */

    /** アクション受領時 start */
    /** アクション受領時 end */

    /** 条件付き設定 start */
    /** 条件付き設定 end */

    /** 前バージョン */
    /** for temp */
    // temp_fDesibale(event);
    //レコード作成時、発送関連情報を非表示
    setFieldShown('deliveryCorp', false);
    setFieldShown('trckNum', false);
    setFieldShown('sendDate', false);
    setFieldShown('expArrivalDate', false);
    // setSpaceShown('setShipment', 'line', 'none');

    // event.record.prjNum.disabled = true;
    //コピー元の「prjNum」の値をsessionStorageの値を代入
    // event.record.prjNum.value = sessionStorage.getItem('prjNum');
    // event.record.shipType.value = sessionStorage.getItem('shipType');
    // event.record.tarDate.value = sessionStorage.getItem('tarDate');
    // event.record.instName.value = sessionStorage.getItem('instName');
    // event.record.instName.lookup = true;
    // データ複製ボタン受取
    // if(sessionStorage.getItem('is_copy_shipdata')){
    //   let ssRecord=JSON.parse(sessionStorage.getItem('copy_shipdata'));
    //   for(let i in ssRecord){
    //     console.log(i);
    //     console.log(ssRecord[i].fcode)
    //     console.log(event.record[ssRecord[i].fcode]);
    //     console.log(event.record[ssRecord[i].fcode].value);
    //     event.record[ssRecord[i].fcode].value=ssRecord[i].value;
    //   }
    //   let devicelistValue=event.record.deviceList.value;
    //   for(let i in devicelistValue){
    //     devicelistValue[i].value.mNickname.lookup=true;
    //   }
    //   event.record.Contractor.lookup=true;
    //   event.record.instName.lookup=true;
    //   event.record.prjId.lookup=true;
    //   sessionStorage.removeItem('is_copy_shipdata');
    // }

    //キャンセルした時の処理
    var cancel_btn = document.getElementsByClassName('gaia-ui-actionmenu-cancel');
    cancel_btn[0].addEventListener('click', function () {
      window.close();
    }, false);
    //反映したあとはsessionStorageの中身を削除
    sessionStorage.removeItem('prjNum');
    sessionStorage.removeItem('shipType');
    sessionStorage.removeItem('tarDate');
    sessionStorage.removeItem('instName');
    sessionStorage.removeItem('copy_shipdata');
    endLoad();
    return event;
  });
  // レコード編集
  kintone.events.on('app.record.edit.show', function(event){
    startLoad();
    /** 初期設定 start */
    acl_defalut(event);
    /** 初期設定 end */

    /** 条件付き設定 start */
    /** 条件付き設定 end */

    /** for temp */
    // temp_fDesibale(event);
    endLoad();
    return event;
  });
  // レコード詳細閲覧
  kintone.events.on('app.record.detail.show', function(event){
    startLoad();
    /** 初期設定 start */
    /** 初期設定 end */

    /** 条件付き設定 start */
    /** 条件付き設定 end */


    /** 前バージョン */
    let prjid=event.record.prjId.value;
    if(prjid!=''){
      setBtn_header('newTab_prj', '案件管理を開く');
      $('#newTab_prj').on('click', function () {
        window.open('https://accel-lab.cybozu.com/k/' + sysid.PM.app_id.project + '/show#record=' + prjid, '_blank'); //該当アプリのレコード詳細画面を開く
      });
    }
    // 新規レコード作成画面を開き、既存のレコードをコピーする
    // setBtn_header('copy_shipdata', 'データ複製');
    // $('#copy_shipdata').on('click', function () {
    //   kintone.api(kintone.api.url('/k/v1/record.json', true), 'GET', {'app': kintone.app.getId(),'id': kintone.app.record.getId()}).then(function(resp){
    //     var newRecord=[];
    //     newRecord.push({fcode:'prjId', 'value':resp.record.prjId.value});
    //     newRecord.push({fcode:'sys_prjId', 'value':resp.record.sys_prjId.value+'-sub'});
    //     newRecord.push({fcode:'instName', 'value':resp.record.instName.value});
    //     newRecord.push({fcode:'Contractor', 'value':resp.record.Contractor.value});
    //     newRecord.push({fcode:'deviceList', 'value':resp.record.deviceList.value});
    //     newRecord.push({fcode:'shipType', 'value':resp.record.shipType.value});

    //     // newRecord.push({fcode:'phoneNum', 'value':resp.record.phoneNum.value});
    //     // newRecord.push({fcode:'prefectures', 'value':resp.record.prefectures.value});
    //     // newRecord.push({fcode:'buildingName', 'value':resp.record.buildingName.value});
    //     // newRecord.push({fcode:'corpName', 'value':resp.record.corpName.value});
    //     // newRecord.push({fcode:'receiver', 'value':resp.record.receiver.value});
    //     // newRecord.push({fcode:'tarDate', 'value':resp.record.tarDate.value});
    //     // // newRecord.push({fcode:'deliveryCorp', 'value':resp.record.deliveryCorp.value});
    //     // // newRecord.push({fcode:'trckNum', 'value':resp.record.trckNum.value});
    //     // // newRecord.push({fcode:'sendDate', 'value':resp.record.sendDate.value});
    //     // newRecord.push({fcode:'prjNum', 'value':resp.record.prjNum.value});
    //     // newRecord.push({fcode:'instID', 'value':resp.record.instID.value});
    //     // newRecord.push({fcode:'aboutDelivery', 'value':resp.record.aboutDelivery.value});
    //     // newRecord.push({fcode:'shipNote', 'value':resp.record.shipNote.value});
    //     // // newRecord.push({fcode:'expArrivalDate', 'value':resp.record.expArrivalDate.value});
    //     // newRecord.push({fcode:'zipcode', 'value':resp.record.zipcode.value});
    //     // newRecord.push({fcode:'instFile', 'value':resp.record.instFile.value});
    //     // newRecord.push({fcode:'city', 'value':resp.record.city.value});
    //     // newRecord.push({fcode:'address', 'value':resp.record.address.value});
    //     // newRecord.push({fcode:'dstSelection', 'value':resp.record.dstSelection.value});
    //     // newRecord.push({fcode:'shipment', 'value':resp.record.shipment.value});
    //     // newRecord.push({fcode:'tmp_backlogID', 'value':resp.record.tmp_backlogID.value});

    //     sessionStorage.setItem('copy_shipdata', JSON.stringify(newRecord));
    //     sessionStorage.setItem('is_copy_shipdata', true);
    //     window.open('https://accel-lab.cybozu.com/k/' + kintone.app.getId() + '/edit'); //該当アプリのレコード詳細画面を開く
    //     console.log(newRecord);
    //   });
    // });
    endLoad();
    return event;
  });
  /** イベント 項目変更 */
  //
  kintone.events.on('app.record.create.chante.', function(event){
    startLoad();
    //
    endLoad();
    return event;
  });

  /** イベント 新規保存 */
  //
  kintone.events.on('app.record.create.submit', function(event){
    startLoad();
    //
    // // 新規レコード保存時、履歴を残す
    setlog_new(event)
    endLoad();
    return event;
  });
  /** イベント 編集保存 */
  //
  kintone.events.on('app.record.edit.submit', function(event){
    startLoad();
    //
    // // 新規レコード保存時、履歴を残す
    endLoad();
    return event;
  });
  /** イベント 詳細確認時 */
  // kintone.events.on('app.record.detail.show', function(event){
  // });
  /** イベント 編集保存完了 */
  //
  kintone.events.on('app.record.edit.submit.success', async function(event){
    startLoad();
    acl_defalut(event);
    recordSplit(event);
    endLoad();
    return event;
  });
  /** イベント　プロセス進行 */
  kintone.events.on('app.record.detail.process.proceed', function (event) {
    startLoad();
    //
    endLoad();
    return event;
  });

  /** 実行関数 */
  // デフォルトアクセス制限
  function acl_defalut(event){
    event.record.prjTitle.disabled = false;
    event.record.prjSubtitle.disabled = false;
    event.record.shipType.disabled = false;
    event.record.c_Contractor.disabled = false;
    event.record.tarDate.disabled = false;
    event.record.dstSelection.disabled = false;
    event.record.receiver.disabled = false;
    event.record.phoneNum.disabled = false;
    event.record.zipcode.disabled = false;
    event.record.prefectures.disabled = false;
    event.record.city.disabled = false;
    event.record.address.disabled = false;
    event.record.buildingName.disabled = false;
    event.record.corpName.disabled = false;
    // event.record.prjSubtitle.disabled = false;
    // event.record.prjSubtitle.disabled = false;
    // event.record.prjSubtitle.disabled = false;
    // event.record.prjSubtitle.disabled = false;
    // event.record.prjSubtitle.disabled = false;
    // event.record.prjSubtitle.disabled = false;
    // event.record.prjSubtitle.disabled = false;
    event.record.recordSplitType.disabled = true;
    // setFieldShown('sys_listId', false);
    // setFieldShown('sys_recordSplitStatus', false);
    let deviceListValue = event.record.deviceList.value;
    let SplitType = event.record.recordSplitType.value;
    // メインレコードの分岐済み行を編集不可にする
    deviceListValue.forEach(list => {
      if(list.value.sys_recordSplitStatus.value.length > 0){
        list.value.recordSplit.disabled = true;
        if(SplitType == 'メイン'){
          list.value.mNickname.disabled = true;
          list.value.shipNum.disabled = true;
          list.value.subBtn.disabled = true;
          list.value.cmsID.disabled = true;
          list.value.sNum.disabled = true;
          list.value.shipRemarks.disabled = true;
        }
      }
      list.value.sys_listId.disabled = true;
      list.value.sys_recordSplitStatus.disabled = true;
    });
    return event;
  }
  /** 分岐レコード作成 */
  async function recordSplit(event){
    // 分岐レコード作成
    const recordSplitTypeValue = event.record.recordSplitType.value;
    if(recordSplitTypeValue == 'メイン'){
      // テーブルの分岐にチェックが入っている場合、そのデータを取得して分岐レコードを作成する
      const thisRecordId = event.record.$id.value;
      let deviceListValue = JSON.parse(JSON.stringify(event.record.deviceList.value));
      let spliceRecord = JSON.parse(JSON.stringify(event.record));
      // let mainRecordDeviceListValue = event.record.deviceList.value;
      spliceRecord.deviceList.value = [];
      let splitCheck = false;
      // await deviceListValue.forEach(list => {
      //   let recordSplitValue = list.value.recordSplit.value;
      //   let sys_recordSplitStatusValue = list.value.sys_recordSplitStatus.value;
      //   if(recordSplitValue.length > 0 && sys_recordSplitStatusValue == 0){
      //     splitCheck = true;
      //     // 分岐レコード用デバイスリストを作成
      //     list.value.sys_recordSplitStatus.value = ['splitAlready'];
      //     list.value.recordSplit.value = ['分岐'];
      //     list.value.sys_listId.value = list.id;
      //     spliceRecord.deviceList.value.push(list);
      //     // メインレコード用分岐済み値をセット
      //   }
      //   // delete list.id;
      // });
      for(let i in deviceListValue){
        let list = deviceListValue[i];
        let recordSplitValue = list.value.recordSplit.value;
        let sys_recordSplitStatusValue = list.value.sys_recordSplitStatus.value;
        if(recordSplitValue.length > 0 && sys_recordSplitStatusValue == 0){
          splitCheck = true;
          // 分岐レコード用デバイスリストを作成
          list.value.sys_recordSplitStatus.value = ['splitAlready'];
          list.value.recordSplit.value = ['分岐'];
          list.value.sys_listId.value = list.id;
          spliceRecord.deviceList.value.push(list);
          // メインレコード用分岐済み値をセット
          event.record.deviceList.value[i].value.sys_recordSplitStatus.value = ['splitAlready'];
        }
      }
      if(splitCheck){
        delete spliceRecord.$id;
        delete spliceRecord.$revision;
        delete spliceRecord['ステータス'];
        delete spliceRecord['レコード番号'];
        delete spliceRecord['作成日時'];
        delete spliceRecord['作成者'];
        delete spliceRecord['作業者'];
        delete spliceRecord['更新日時'];
        delete spliceRecord['更新者'];
        delete spliceRecord.sys_log;
        delete spliceRecord.sys_snResult;
        spliceRecord.recordSplitType.value = '分岐';
        spliceRecord.sys_recordSplitCode.value = thisRecordId;

        // 新規レコード作成
        await kintone.api(kintone.api.url('/k/v1/record.json', true), 'POST', {
          app: kintone.app.getId(),
          record: spliceRecord
        }).then(function(resp){
          console.log(resp);
          kintone.api(kintone.api.url('/k/v1/record.json', true), 'PUT', {
            app: kintone.app.getId(),
            id: thisRecordId,
            record: {
              deviceList: {value: event.record.deviceList.value},
              sys_recordSplitCode: {value: thisRecordId}
            }
          }).then(function(resp2){
            alert('レコード分岐に成功しました。\n分岐したレコード番号は「'+ resp.id +'」です。\nブラウザを更新してください。')
          });
        }).catch(function(e){
          console.log(e);
          alert('レコード分岐に失敗しました。');
        });
      }
    }
    // // 新規レコード保存時、履歴を残す
  }

  // function temp_fDesibale(event){
  //   console.log(event);
  //   let get_fCode = getFields();
  //   console.log(get_fCode);
  //   for(let i=8; i<get_fCode.length; i++){
  //     if(get_fCode[i].type !== "REFERENCE_TABLE"){
  //       event.record[get_fCode[i].var].disabled = false;
  //     }
  //   }
  //   return event;
  // }
})();