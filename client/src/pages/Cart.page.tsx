import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { List, Avatar, Divider, Button, Modal, Input } from "antd";
import { SiteAddFetchServerAC } from "../state/reducer/site.reducer";
//import { CardOrderAddFetchServerAC } from "../state/reducer/order.reducer";
import {
  CartAddCountProductAC,
  CartOpenConfirmModelAC,
  CartInputAC,
  CardOrderAddFetchServerAC,
} from "../state/reducer/cart.reducer";
class Cart extends React.Component<any, any> {
  changeHandler = (event: any) => {
    return { value: event.target.value, name: event.target.name };
  };

  render() {
    return (
      <>
        <Modal
          title="Confirm order"
          visible={this.props.visibleConfirmModel}
          onOk={() => {
            this.props.CardOrderAddFetchServerAC({
              siteName: this.props.siteName,
              adres: this.props.adres,
              city: this.props.city,
              street: this.props.street,
              index: this.props.index,
              userId: this.props.userId,
              products: this.props.cartProducts,
            });
            this.props.CartOpenConfirmModelAC(false);
          }}
          onCancel={() => this.props.CartOpenConfirmModelAC(false)}
        >
          {this.props.cartTypes.find((element: any) => element === "site") ? (
            <>
              <Divider orientation="left">Site settings</Divider>
              <Input
                placeholder="siteName"
                name="siteName"
                onChange={(e: any) =>
                  this.props.CartInputAC(this.changeHandler(e))
                }
              />
            </>
          ) : null}
          {this.props.cartTypes.find(
            (element: any) => element === "product"
          ) ? (
            <>
              <Divider orientation="left">Delivery settings</Divider>
              <Input
                placeholder="Adres"
                name="adres"
                onChange={(e: any) =>
                  this.props.CartInputAC(this.changeHandler(e))
                }
              />
              <Input
                placeholder="Street"
                name="street"
                onChange={(e: any) =>
                  this.props.CartInputAC(this.changeHandler(e))
                }
              />
              <Input
                placeholder="City"
                name="city"
                onChange={(e: any) =>
                  this.props.CartInputAC(this.changeHandler(e))
                }
              />
              <Input
                placeholder="index"
                name="index"
                onChange={(e: any) =>
                  this.props.CartInputAC(this.changeHandler(e))
                }
              />
            </>
          ) : null}
        </Modal>

        <Container>
          <Divider orientation="left">Карзина</Divider>
          <List
            itemLayout="horizontal"
            dataSource={this.props.cartProducts}
            renderItem={(item: any, index: any) => (
              <List.Item style={{ display: "flex", alignItems: "center" }}>
                <List.Item.Meta
                  avatar={<Avatar src={item.img} />}
                  title={<a>{item.name}</a>}
                  description={item.description}
                />
                <p style={{ margin: 0, marginRight: 25 }}>
                  Всего: {item.amount}
                </p>
                <p style={{ margin: 0, marginRight: 25 }}>
                  Цена: {item.price ? item.price * item.count : 'free' }
                </p>
                <Button
                  disabled={item.count > item.amount - 1}
                  onClick={() =>
                    this.props.CartAddCountProductAC({
                      count: item.count + 1,
                      index,
                    })
                  }
                >
                  +
                </Button>
                <Input
                  value={item.count}
                  type="number"
                  placeholder="count"
                  name="count"
                  style={{ width: "100px", textAlign: "center" }}
                  onChange={(e: any) =>
                    this.props.CartInputAC(this.changeHandler(e))
                  }
                />
                <Button
                  onClick={() =>
                    this.props.CartAddCountProductAC({
                      count: item.count - 1,
                      index,
                    })
                  }
                >
                  -
                </Button>
              </List.Item>
            )}
          />
          <div className="">Цена доставки: </div>
          <div className="">
            Итого:
            {this.props.cartProducts.length
              ? this.props.cartProducts.reduce(
                  (prev: any, next: any) =>
                    prev + (next.price * next.count),
                  0
                )
              : null}
             
          </div>

          <Button
            disabled={!this.props.cartProducts.length}
            type="primary"
            onClick={() => this.props.CartOpenConfirmModelAC(true)}
          >
            Confirm
          </Button>
          {/* <Button type="primary" onClick={( ) => {
            this.props.SiteAddFetchServerAC({siteName: 'frefast'})
          }}>Add site</Button> */}
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    cartProducts: state.cartReducer.cartProducts,
    visibleConfirmModel: state.cartReducer.visibleConfirmModel,
    cartTypes: state.cartReducer.cartTypes,
    siteName: state.cartReducer.currectInput.siteName,
    adres: state.cartReducer.currectInput.adres,
    city: state.cartReducer.currectInput.city,
    street: state.cartReducer.currectInput.street,
    index: state.cartReducer.currectInput.index,
    userId: state.authReducer.data.userId,
  };
};

export default connect(mapStateToProps, {
  CartInputAC,
  CartAddCountProductAC,
  SiteAddFetchServerAC,
  CardOrderAddFetchServerAC,
  CartOpenConfirmModelAC,
})(Cart);
